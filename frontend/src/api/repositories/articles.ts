import { clientBase } from "api/common";

const getArticlesMethod = () => clientBase("api/v1/articles", "GET");

const updateArticleMethod = (_id: number, body: any) =>
  clientBase(`api/v1/articles/${_id}`, "PATCH", { body });

const deleteArticleMethod = (_id: number) =>
  clientBase(`api/v1/articles/${_id}`, "DELETE");

export { getArticlesMethod, updateArticleMethod, deleteArticleMethod };
