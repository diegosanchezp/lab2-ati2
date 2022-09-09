import React from "react"
import {GenericDialog} from "components/Dialog"
import './App.css'
import { Dialog } from '@headlessui/react';
import {Button} from "components/Button";
import logo from "assets/logo.svg";

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
      <Button onClick={() => toggleDialog("deleteArticle", true)} className="">Open Dialog</Button>
    </div>
  )
}

export default App
