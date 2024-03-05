import Search from "./model/Search";

let search = new Search("cake");
search.doSearch().then((r) => console.log(r));
