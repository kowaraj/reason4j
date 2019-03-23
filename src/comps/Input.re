let valueFromEvent = (evt) : string => (
  evt
  |> ReactEventRe.Form.target
  |> ReactDOMRe.domElementToObj
)##value;

type state = string;
  let component = ReasonReact.reducerComponent("Input");
  let make = (~onSubmit, ~ph="Write smth..", _) => {
    ...component,
    initialState: () => "MATCH (ee:Person) WHERE ee.name = \"Emil\" RETURN ee;",
    reducer: (newText, _text) => ReasonReact.Update(newText),
    render: ({state: text, send}) =>
      <input
        value=text
        type_="text"
        placeholder=ph
        onChange=((evt) => send(valueFromEvent(evt)))
        onKeyDown=((evt) =>
          if (ReactEventRe.Keyboard.key(evt) == "Enter") {
            onSubmit(text);
            send("MATCH (ee:Person) WHERE ee.name = \"Emil\" RETURN ee;")
          }
        )
      />
  };
