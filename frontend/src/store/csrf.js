import Cookies from "js-cookie";

export async function csrfFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";

    options.headers["XSRF-TOKEN"] = Cookies.get("XSRF-TOKEN");
  }

  const res = await fetch(url, options);
  if (res.status >= 400) throw res;
  return res;
}

export async function restoreCSRF() {
  return csrfFetch("/api/csrf/restore");
}

export const convertDate = (date) => {
  console.log("DATEEEEEEE ", date, typeof date);
  const year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  console.log("FINAL DATE ", year, month, day);
  return `${year}-${month}-${day}`;
};
