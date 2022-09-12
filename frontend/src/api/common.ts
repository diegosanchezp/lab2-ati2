import { API_URL } from "config";

export const clientBase = async (
  endpoint: string,
  method: string,
  { body, customConfig }: any = {},
  handlerSession = true
) => {
  const headers: { [key: string]: string } = {
    "content-type": "application/json",
    accept: "application/json",
  };

  const config = {
    ...customConfig,
    method,
    headers: {
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await window.fetch(`${API_URL}/${endpoint}`, config);
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.indexOf("application/json") != -1) {
    const _data = await response.json();
    return {
      data: response.ok ? _data : null,
      error: !response.ok,
      status: response.status,
    };
  }

  return {
    data: response.ok,
    error: !response.ok,
    status: response.status,
  };
};

export const queryFormat = (_params: any) => {
  let query = "";
  let prepend = "?";
  const params = Object.entries(_params);

  params.forEach((param) => {
    if (
      param.length != 0 &&
      param[1] != null &&
      param[1] != undefined &&
      param[0]
    ) {
      if (!(param[1] instanceof Array)) {
        prepend = query ? "&" : "?";
        query += `${prepend}${param[0]}=${param[1]}`;
      }

      if (param[1] instanceof Array) {
        if (param[1].some((filter) => filter instanceof String)) {
          prepend = query ? "&" : "?";
          query += `${prepend}${param[0]}=${param[1].join(",")}`;
        }
        if (param[1].some((filter) => filter instanceof Object)) {
          param[1].forEach((filter, index) => {
            prepend = query ? "&" : "?";
            query +=
              filter.attribute &&
              filter.value != null &&
              filter.value != undefined &&
              filter.operator
                ? `${prepend}filter[${index}][scope]=${filter.scope}&filter[${index}][attribute]=${filter.attribute}&filter[${index}][operator]=${filter.operator}&filter[${index}][value]=${filter.value}`
                : "";
          });
        }
      }
    }
  });
  return query;
};
