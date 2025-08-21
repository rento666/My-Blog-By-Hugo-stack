(() => {
  // <stdin>
  var tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "\u2026": "&hellip;"
  };
  function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
  }
  function replaceHTMLEnt(str) {
    return str.replace(/[&<>"]/g, replaceTag);
  }
  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
  }
  var Sjzdh = class _Sjzdh {
    data;
    form;
    input;
    list;
    resultTitle;
    resultTitleTemplate;
    constructor({ form, input, list, resultTitle, resultTitleTemplate }) {
      this.form = form;
      this.input = input;
      this.list = list;
      this.resultTitle = resultTitle;
      this.resultTitleTemplate = resultTitleTemplate;
      this.handleQueryString();
      this.bindQueryStringChange();
      this.bindSearchForm();
      this.loadAll();
    }
    static processMatches(str, matches, ellipsis = true, charLimit = 140, offset = 20) {
      matches.sort((a, b) => a.start - b.start);
      let i = 0, lastIndex = 0, charCount = 0;
      const resultArray = [];
      while (i < matches.length) {
        const item = matches[i];
        if (ellipsis && item.start - offset > lastIndex) {
          resultArray.push(`${replaceHTMLEnt(str.substring(lastIndex, lastIndex + offset))} [...] `);
          resultArray.push(`${replaceHTMLEnt(str.substring(item.start - offset, item.start))}`);
          charCount += offset * 2;
        } else {
          resultArray.push(replaceHTMLEnt(str.substring(lastIndex, item.start)));
          charCount += item.start - lastIndex;
        }
        let j = i + 1, end = item.end;
        while (j < matches.length && matches[j].start <= end) {
          end = Math.max(matches[j].end, end);
          ++j;
        }
        resultArray.push(`<mark>${replaceHTMLEnt(str.substring(item.start, end))}</mark>`);
        charCount += end - item.start;
        i = j;
        lastIndex = end;
        if (ellipsis && charCount > charLimit) break;
      }
      if (lastIndex < str.length) {
        let end = str.length;
        if (ellipsis) end = Math.min(end, lastIndex + offset);
        resultArray.push(`${replaceHTMLEnt(str.substring(lastIndex, end))}`);
        if (ellipsis && end != str.length) {
          resultArray.push(` [...]`);
        }
      }
      return resultArray.join("");
    }
    async searchKeywords(keywords) {
      const rawData = await this.getData();
      const results = [];
      const regex = new RegExp(keywords.filter((v, index, arr) => {
        arr[index] = escapeRegExp(v);
        return v.trim() !== "";
      }).join("|"), "gi");
      for (const item of rawData) {
        const nameMatches = [];
        const aliasMatches = [];
        let result = { ...item, preview: item.desc, matchCount: 0 };
        const nameMatchAll = item.name.matchAll(regex);
        for (const match of Array.from(nameMatchAll)) {
          nameMatches.push({ start: match.index, end: match.index + match[0].length });
        }
        for (const alias of item.aliases) {
          const aliasMatchAll = alias.matchAll(regex);
          for (const match of Array.from(aliasMatchAll)) {
            aliasMatches.push({ start: match.index, end: match.index + match[0].length });
          }
        }
        if (nameMatches.length > 0) {
          result.name = _Sjzdh.processMatches(item.name, nameMatches, false);
        }
        result.matchCount = nameMatches.length + aliasMatches.length;
        if (result.matchCount > 0) {
          results.push(result);
        }
      }
      return results.sort((a, b) => b.matchCount - a.matchCount);
    }
    async doSearch(keywords) {
      const startTime = performance.now();
      const results = await this.searchKeywords(keywords);
      this.clear();
      for (const item of results) {
        this.list.append(_Sjzdh.render(item));
      }
      const endTime = performance.now();
      this.resultTitle.innerText = this.generateResultTitle(results.length, ((endTime - startTime) / 1e3).toPrecision(1));
    }
    generateResultTitle(resultLen, time) {
      return this.resultTitleTemplate.replace("#PAGES_COUNT", resultLen).replace("#TIME_SECONDS", time);
    }
    async getData() {
      if (!this.data) {
        const jsonURL = this.form.dataset.json;
        this.data = await fetch(jsonURL).then((res) => res.json());
      }
      return this.data;
    }
    async loadAll() {
      const data = await this.getData();
      this.clear();
      for (const item of data) {
        this.list.append(_Sjzdh.render(item));
      }
      this.resultTitle.innerText = this.generateResultTitle(data.length, "0");
    }
    bindSearchForm() {
      let lastSearch = "";
      const eventHandler = (e) => {
        e.preventDefault();
        const keywords = this.input.value.trim();
        _Sjzdh.updateQueryString(keywords, true);
        if (keywords === "") {
          this.loadAll();
          return;
        }
        if (lastSearch === keywords) return;
        lastSearch = keywords;
        this.doSearch(keywords.split(" "));
      };
      this.input.addEventListener("input", eventHandler);
      this.input.addEventListener("compositionend", eventHandler);
    }
    clear() {
      this.list.innerHTML = "";
      this.resultTitle.innerText = "";
    }
    bindQueryStringChange() {
      window.addEventListener("popstate", () => {
        this.handleQueryString();
      });
    }
    handleQueryString() {
      const pageURL = new URL(window.location.toString());
      const keywords = pageURL.searchParams.get("keyword");
      this.input.value = keywords || "";
      if (keywords) {
        this.doSearch(keywords.split(" "));
      } else {
        this.loadAll();
      }
    }
    static updateQueryString(keywords, replaceState = false) {
      const pageURL = new URL(window.location.toString());
      if (keywords === "") {
        pageURL.searchParams.delete("keyword");
      } else {
        pageURL.searchParams.set("keyword", keywords);
      }
      if (replaceState) {
        window.history.replaceState("", "", pageURL.toString());
      } else {
        window.history.pushState("", "", pageURL.toString());
      }
    }
    static render(item) {
      const card = document.createElement("article");
      card.className = "card";
      let abilityHTML = "";
      if (item.ability && item.ability.effects.some((effect) => effect.content && effect.content.trim() !== "")) {
        abilityHTML = `
                <div class="ability">
                    <div class="ability-title">${item.ability.title}</div>
                    ${item.ability.effects.map((effect) => `
                        <div class="ability-item">
                            <div class="ability-header">${effect.name}</div>
                            <div class="ability-content hidden">${effect.content}</div>
                        </div>
                    `).join("")}
                </div>
            `;
      }
      card.innerHTML = `
            <a href="#">
                <div class="card-header">
                    <div>
                        <div class="card-title">
                            <img class="card-grade" src="/grade6.png" alt="\u7EA2\u8272\u6536\u85CF\u54C1" />
                            <span>${item.name}</span>
                        </div>
                        <div class="card-tag">${item.tag}</div>
                    </div>
                    <div class="card-icon"></div>
                </div>
                <div class="card-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" />
                </div>
                <div class="card-weight">${item.weight}</div>
                <div class="card-desc">${item.desc}</div>
                ${abilityHTML}
            </a>
        `;
      card.querySelectorAll(".ability-header").forEach((header) => {
        header.addEventListener("click", () => {
          const parent = header.parentElement;
          const content = parent.querySelector(".ability-content");
          content.classList.toggle("hidden");
          header.classList.toggle("active");
        });
      });
      return card;
    }
  };
  window.addEventListener("load", () => {
    setTimeout(() => {
      const sjzdhForm = document.querySelector(".sjzdh-form"), sjzdhInput = sjzdhForm.querySelector("input"), sjzdhResultList = document.querySelector(".sjzdh-result--list"), sjzdhResultTitle = document.querySelector(".sjzdh-result--title");
      new Sjzdh({
        form: sjzdhForm,
        input: sjzdhInput,
        list: sjzdhResultList,
        resultTitle: sjzdhResultTitle,
        resultTitleTemplate: window.sjzdhResultTitleTemplate
      });
    }, 0);
  });
  var stdin_default = Sjzdh;
})();
