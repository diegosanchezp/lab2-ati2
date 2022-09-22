import React from "react"
import {GenericDialog} from "components/Dialog"
import './App.css'
// Translations
import './i18n/config';
import { useTranslation } from 'react-i18next';

import { Dialog, Listbox, Transition } from '@headlessui/react';
import { Button,SubmitButton } from "components/Button";
import logo from "assets/logo.svg";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/solid";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

import { getArticlesMethod, createArticleMethod, deleteArticleMethod, updateArticleMethod } from 'api/repositories/articles'

type langItem = {
    nativeName: string
    code: string
}

const langList: langItem[] = [
  {nativeName: 'English', code: 'en'},
  {nativeName: 'Español', code: 'es'},
]

function Title(props: {children: React.ReactNode}){
  const {children} = props;
  return (
    <h2 className="text-2xl my-4">
      {children}
    </h2>
  )
}

function App() {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = React.useState(langList[0])

  const [openDialogs, setOpenDialogs] = React.useState({
    editArticle: false,
    deleteArticle: false,
    addArticle: false
  });

  const [articles, setArticles] = React.useState({
    list: [],
    itemIdToDelete: -1,
    itemIdToEdit: -1,
    itemTitleToEdit: '',
    itemPostToEdit: '',
    itemTitleToAdd: '',
    itemPostToAdd: '',
    articleReading: 0
  });

  function changeLang(lang: langItem){
    i18n.changeLanguage(lang.code);
    setSelected(lang)
  }
  function toggleDialog(key: keyof typeof openDialogs, toggle: boolean){
    setOpenDialogs(prevState => ({...prevState, [key]: toggle}));
  }
  
  async function onAddArticle(e: any){
    e.preventDefault();
    await createArticleMethod({ title: articles.itemTitleToAdd, post: articles.itemPostToAdd })
    setArticles(prevState => ({...prevState, itemTitleToAdd: '',itemPostToAdd: ''}))
    getArticles()
    toggleDialog("editArticle", false);
  }

  async function onEditArticle(e: any){
    e.preventDefault();
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

  function toggleArticleReadin(_id: number){
    setArticles(prevState => ({
      ...prevState, 
      articleReading: _id === prevState.articleReading ? 0 : _id
    }))
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
          <ul className="flex justify-between">
            <li>
              <div className="flex items-baseline">
                <img src={logo} className="mr-2"/>
                <p className="self-center">
                  {t('brand')}
                </p>
              </div>
            </li>
            <li>
              <Listbox value={selected} onChange={changeLang}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate text-black">{selected.nativeName}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {langList.map((lang, langIdx) => (
                        <Listbox.Option
                          key={langIdx}
                          className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                        }
                        value={lang}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {lang.nativeName}
                            </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                    )}
                  </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </li>
          </ul>
        </nav>

        <section className="my-2 new-article-box">
          <form onSubmit={onAddArticle}>
            <section className="text-white w-full">
              <input placeholder={t('formTitlePlaceHolder')} required className="w-full rounded-lg bg-black border-white p-2 focus:border-white mb-2" value={articles.itemTitleToAdd} onInput={(event) => onInputItemEditData('itemTitleToAdd', event.target.value)}></input>
              <textarea placeholder={t("formAtextPlaceHolder")} required className="w-full h-100 rounded-lg bg-black border-white without-scroll p-2 focus:border-white mb-2" value={articles.itemPostToAdd} onInput={(event) => onInputItemEditData('itemPostToAdd', event.target.value)}></textarea>
            </section>
            
          <div className="center-h mt-2">
            <SubmitButton
              styleType="secondary"
              value={t("createArticleBtn")}
            />
          </div>
          </form>
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
                  <pre
                    style={{
                      maxHeight: article.id === articles.articleReading ? 'none' : 150
                    }}
                  >{article.post}</pre>
                  <div className="center-h">
                    <Button
                      onClick={() => toggleArticleReadin(article.id)}
                    >
                      {
                        article.id === articles.articleReading ?
                        t('showLessBtn'):
                        t('showMoreBtn')
                      }
                    </Button>
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
          title={t("editArticle")}
          titleClassName="max-w-3xl"
          onClose={()=> toggleDialog("editArticle", false)}
        >
          <form onSubmit={onEditArticle}>
          <Dialog.Description>
            <section className="text-white w-full">
              <input required className="w-full rounded-lg bg-black border-white p-2 focus:border-white mb-2" value={articles.itemTitleToEdit} onInput={(event) => onInputItemEditData('itemTitleToEdit', event.target.value)}></input>
              <textarea required className="w-full h-50 rounded-lg bg-black border-white without-scroll p-2 focus:border-white mb-2" value={articles.itemPostToEdit} onInput={(event) => onInputItemEditData('itemPostToEdit', event.target.value)}></textarea>
            </section>
            
          </Dialog.Description>

          <div className="center-h mt-2">
            <SubmitButton
              styleType="secondary"
              value={t("saveArticle")}
            />
          </div>
          </form>

        </GenericDialog>
      </div>
    </main>
  )
}

export default App
