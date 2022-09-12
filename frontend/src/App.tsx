import React from "react"
import {GenericDialog} from "components/Dialog"
import './App.css'
import { Dialog } from '@headlessui/react';
import {Button} from "components/Button";
import logo from "assets/logo.svg";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/solid";
import { getArticlesMethod, deleteArticleMethod, updateArticleMethod } from 'api/repositories/articles'

function Title(props: {children: React.ReactNode}){
  const {children} = props;
  return (
    <h2 className="text-2xl my-4">
      {children}
    </h2>
  )
}

function App() {
  const [openDialogs, setOpenDialogs] = React.useState({
    editArticle: false,
    deleteArticle: false
  });

  const [articles, setArticles] = React.useState({
    list: [],
    itemIdToDelete: -1,
    itemIdToEdit: -1,
    itemTitleToEdit: '',
    itemPostToEdit: ''
  });

  function toggleDialog(key: keyof typeof openDialogs, toggle: boolean){
    setOpenDialogs(prevState => ({...prevState, [key]: toggle}));
  }
  async function onEditArticle(){
    await updateArticleMethod(articles.itemIdToEdit, { title: articles.itemTitleToEdit, post: articles.itemPostToEdit })
    getArticles()
    toggleDialog("editArticle", false);
  }
  async function onDeleteArticle(){
    await deleteArticleMethod(articles.itemIdToDelete)
    getArticles()
    toggleDialog("deleteArticle", false);
  }
  async function getArticles() {
    const { data, error } = await getArticlesMethod()
    if(data){
      setArticles(prevState => ({...prevState, list: data.data}));
    }

    if(error){
      console.log(error)
    }
  }

  function openDeleteDialog(_id: number){
    setArticles((prevState) => ({...prevState, itemIdToDelete: _id}))
    toggleDialog("deleteArticle", true)
  } 

  function openEditDialog(_id: number){
    const articleToEdit = articles.list.find((article) => article.id = _id)
    if(!articleToEdit) return

    setArticles((prevState) => ({...prevState, itemIdToEdit: _id}))
    setArticles((prevState) => ({...prevState, itemTitleToEdit: articleToEdit.title }))
    setArticles((prevState) => ({...prevState, itemPostToEdit: articleToEdit.post }))
    toggleDialog("editArticle", true)
  } 

  function onInputItemEditData(key: string, _value: string){
    setArticles((prevState) => ({...prevState, [key]: _value}))
  }

  const iconStyle = "text-white h-6 w-6";

  React.useEffect(() => {
    getArticles()
  }, []);

  return (
    <main className="pb-10">
      <div className="App">
        <nav className="border-b border-white pb-4 mt-2 mb-4">
          <ul className="flex">
            <li>
              <div className="flex items-baseline">
                <img src={logo} className="mr-2"/>
                <p className="self-center">
                  Articles.com
                </p>
              </div>
            </li>
          </ul>
        </nav>

        <section className="my-2">
          <Title>Crear articulo</Title>
        </section>
        <section className="flex flex-col gap-y-4">
          <Title>Articulos</Title>
          <section className="overflow-y-auto light-scroll max-h-200">
            {articles.list.map((article, index) => 
              <div className="articleSection" key={article.id}>
                <article className="flex flex-col py-2 px-5 border-2 border-white border-solid rounded-md my-2">
                  <div className="flex mb-2 justify-between">
                    <header className="text-xl">{article.title}</header>
                    <div className="flex gap-2">
                      <button onClick={() => openEditDialog(article.id)}>
                        <PencilIcon className={`${iconStyle}`}/>
                      </button>
                      <button
                          onClick={() => openDeleteDialog(article.id)}
                      >
                        <TrashIcon
                          className={`${iconStyle}`}/>
                      </button>
                    </div>
                  </div>
                  <p>{article.post}</p>
                  <div className="center-h">
                    <Button>Mostrar más</Button>
                  </div>
                </article>
              </div>
          )}
          </section>
        </section>

        <GenericDialog
          open={openDialogs.deleteArticle}
          title="Borrar articulo 1"
          onClose={()=> toggleDialog("deleteArticle", false)}
        >
          <Dialog.Description>¿ Realmente desas borrar el articulo 2 ? No podras deshacer esto.</Dialog.Description>

          <div className="center-h mt-2">
            <Button
              styleType="danger"
              onClick={() => onDeleteArticle()}>
              Borrar
            </Button>
          </div>


        </GenericDialog>

        <GenericDialog
          open={openDialogs.editArticle}
          title="Editar articulo "
          titleClassName="max-w-3xl"
          onClose={()=> toggleDialog("editArticle", false)}
        >
          <Dialog.Description>
            <section className="text-white w-full">
              <input className="w-full rounded-lg bg-black border-white p-2 focus:border-white mb-2" value={articles.itemTitleToEdit} onInput={(event) => onInputItemEditData('itemTitleToEdit', event.target.value)}></input>
              <textarea className="w-full h-50 rounded-lg bg-black border-white without-scroll p-2 focus:border-white mb-2" value={articles.itemPostToEdit} onInput={(event) => onInputItemEditData('itemPostToEdit', event.target.value)}></textarea>
            </section>
            
          </Dialog.Description>

          <div className="center-h mt-2">
            <Button
              styleType="secondary"
              onClick={() => onEditArticle()}>
              Guardar articulo
            </Button>
          </div>


        </GenericDialog>
      </div>
    </main>
  )
}

export default App
