let str = ReasonReact.string;

type state = {
  items: list(TodoType.item),
  text: string
};

type action = 
  | Query(string); 

let component = ReasonReact.reducerComponent("Neo4j");


//[@bs.module "./readfile"] [@bs.val] external read_file : unit => string = "";
//read_file();
// DB access

[@bs.module "./jstest"] [@bs.val] external neo4j_create : string => unit = "";
[@bs.module "./jstest"] [@bs.val] external neo4j_match : string => string = "";
[@bs.module "./jstest"] [@bs.val] external neo4j_match_with_callback : (string, (string => unit)) => string = "";
[@bs.module "./jstest_http"] [@bs.val] external http_req : (string, (string => unit)) => string = "";

let cbX = msg => {
    Js.log("RETURN ====== ")
    Js.log(msg)
  }
  
let read_text_file_____queryDB = q => {
    http_req("teststring", cbX);
    {TodoType.id: 0, text: "query completed", completed: false} |>ignore;
  }

let queryDB = q => {
    //let q = "CREATE (ee:Person { name: \"Emil600\", from: \"Sweden\", klout: 600 })";
    neo4j_match_with_callback(q, cbX);
    {TodoType.id: 0, text: "query completed", completed: false}
  }

/*   let m = "MATCH (ee:Person) WHERE ee.name = \"Emil600\" RETURN ee"; */
/* let m_ret = neo4j_match(m); */
/* Js.log(m_ret); */

// Make
  
let make = (~message, ~id=0, _children) => {
  ...component,
  initialState: () => { text: "enter a query", items: [{id: 0, text: "first item", completed: false }]},
  reducer: (action, {items}) => 
    switch (action) {
      | Query(text) =>  ReasonReact.Update({text: text, items: [ queryDB(text), ...items]})
      },
  render: self =>
      <div>
        <div className="Neo4j">
            (ReasonReact.string(message)) 
        </div>        
        <p/>
          
        <div className="title">
            (str("Neo4j DB Query: "))
            <Input onSubmit= ((text) => self.send(Query(text))) />
        </div>

    </div>
};
