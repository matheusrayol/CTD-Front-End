import { useState } from "react";
import { Card } from "./Card";

// Aqui você irá escrever as suas funções de Validação, para verificar se o Formulário foi preenchido corretamente

function App() {
  const [errorForm, setErrorForm] = useState(false);
  const [cardName, setCardName] = useState("");
  const [colorName, setColorName] = useState("");
  const [allCards, setAllCards] = useState([
    {
      name: "White",
      color: "#FFFFFF",
    },
  ]);

  function addColor(event) {
    event.preventDefault();

    const newCard = {
      name: cardName,
      color: colorName,
    };

    console.log(newCard);

    if (cardName === "" || colorName === "") {
      setErrorForm(true);
      return;
    } else {
      setErrorForm(false);
      setAllCards([...allCards, newCard]);
      setCardName("");
      setColorName("");
    }
  }

  return (
    <>
      <section
        className="text-center text-white"
        style={{
          position: "relative",
          backgroundColor: "#343a40",
          paddingTop: "12rem",
          paddingBottom: "12rem",
        }}
      >
        <a
          href="https://matheusrayol.com"
          style={{
            position: "fixed",
            width: "60px",
            height: "60px",
            bottom: "20px",
            right: "20px",
            backgroundSize: "contain",
            backgroundImage:
              "url(http://matheusrayol.com/assets/img/avatar.png)",
            borderRadius: "50px",
            boxShadow: "2px 2px 3px #333",
          }}
        >
          <i></i>
        </a>
        <div className="container">
          <div className="row">
            <div className="col position-relative">
              <h1 className="mb-4">Adicionar nova cor</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row gx-0 d-flex justify-content-center">
            <div className="col">
              <form
                className="d-sm-flex justify-content-sm-center"
                onSubmit={(event) => addColor(event)}
              >
                <div className="row">
                  <div className="col-auto mb-2">
                    <input
                      id="cardName"
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Nome da cor"
                      onChange={(event) => setCardName(event.target.value)}
                    />
                  </div>
                  <div className="col-auto mb-2">
                    <input
                      id="colorName"
                      className="form-control form-control-color form-control-lg"
                      type="color"
                      onChange={(event) => setColorName(event.target.value)}
                    />
                  </div>
                  <div className="col-auto m-auto mb-2">
                    <button
                      className="btn btn-outline-light btn-lg d-xxl-flex justify-content-xxl-start"
                      type="submit"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </form>
            </div>
			{errorForm ? <span>Todos os campos precisam ser preenchidos</span> : null}
          </div>
        </div>
      </section>

      <section className="cards">
        <div
          className="container d-flex justify-content-center align-items-center flex-wrap mt-4"
          style={{ width: "100%", height: "100%" }}
        >
          {allCards.map((card) => {
            return <Card cardData={card} />;
          })}
        </div>
      </section>
    </>
  );
}

export default App;
