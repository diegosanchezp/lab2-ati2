import React from "react"
import {GenericDialog} from "components/Dialog"
import './App.css'
import { Dialog } from '@headlessui/react';
import {Button} from "components/Button";
import logo from "assets/logo.svg";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/solid";

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

  //console.log(openDialogs);

  function toggleDialog(key: keyof typeof openDialogs, toggle: boolean){
    setOpenDialogs(prevState => ({...prevState, [key]: toggle}));
  }
  async function onDeleteArticle(){
    toggleDialog("deleteArticle", false);
    console.log("delete me");
  }

  const iconStyle = "text-white h-6 w-6";
  return (
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
      <section>
        <Title>Articulos</Title>
        <div className="articleSection">
          <article className="flex flex-col py-2 px-5 border-2 border-white border-solid rounded-md my-2">
            <div className="flex mb-2 justify-between">
              <header className="text-xl">Articulo 1</header>
              <div className="flex gap-2">
                <button>
                  <PencilIcon className={`${iconStyle}`}/>
                </button>
                <button
                    onClick={() => toggleDialog("deleteArticle", true)}
                >
                  <TrashIcon
                    className={`${iconStyle}`}/>
                </button>
              </div>
            </div>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <div className="center-h">
              <Button>Mostrar más</Button>
            </div>
          </article>
        </div>
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
    </div>
  )
}

export default App
