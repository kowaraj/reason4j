var retval = "default retval";

function neo4j_create (q_str) {
    console.log('::create');
    var neo4j = require('neo4j');

    var db = new neo4j.GraphDatabase('http://neo4j:1234@localhost:7474');
//    var db = new neo4j.GraphDatabase('http://neo4j:1234@137.138.204.240:7474');

    db.cypher({
	query: q_str,
    }, function (err, results) {
	console.log('...');
    });
};

function set_retval(a) {
    retval = a;
}

function get_retval() {
    return retval;
}

function neo4j_match (q_str) {
    console.log('::match');
    var neo4j = require('neo4j');
    console.log(neo4j);
    var db = new neo4j.GraphDatabase('http://neo4j:1234@localhost:7474');
    var x_ret = "";

    db.cypher({
	query: q_str,
	
    }, function (err, results) {
	if (err) throw err;
	var result = results[0];
	if (!result) {
            console.log('No user found.');
	    return "no result";
	} else {
            var user = result['ee'];
            console.log("success return !");
            console.log(JSON.stringify(user, null, 4));
            x_ret = "x-ret value"; //JSON.stringify(user.klou, null, 4);
            console.log(x_ret);
	    retval = x_ret;

            console.log("retval = " + retval );
	    set_retval(retval);
	    return retval;
	}
    });

    console.log("x-ret value before the return");
    console.log(x_ret);
    //return "reached end of func";
    return get_retval();
};

function neo4j_match_with_callback (q_str, cb) {
    console.log('::match with a callback !! ');
    var neo4j = require('neo4j');

    var db = new neo4j.GraphDatabase('http://neo4j:1234@localhost:7474');

    db.cypher({
	query: q_str,
	
    }, function (err, results) {
	if (err) throw err;
	var result = results[0];
	if (!result) {
            console.log('No user found.');
	    return "no result";
	} else {
            var user = result['ee'];
            console.log("success return !");
            console.log(JSON.stringify(user, null, 4));
            console.log("user = " + user);
            console.log(user);
	    cb(user.properties.name + "-" + user.properties.klout);
	    return retval;
	} 
    });

    console.log("x-ret value before the return");

};

function init () {
    console.log('hi');
    var neo4j = require('neo4j');
    var db = new neo4j.GraphDatabase('http://neo4j:1234@localhost:7474');

    db.cypher({
	query: 'CREATE (ee:Person { name: "Emil1", from: "Sweden", klout: 91 })',
    }, function (err, results) {
	console.log('...');
    });

    db.cypher({
	query: 'CREATE (ee:Person { name: "Emil3", from: "Sweden", klout: 93 })',
    }, function (err, results) {
	console.log('...');
    });

    db.cypher({
	query: 'MATCH (ee:Person) WHERE ee.name = "Emil3" RETURN ee',
	
    }, function (err, results) {
	if (err) throw err;
	var result = results[0];
	if (!result) {
            console.log('No user found.');
	} else {
            var user = result['ee'];
            console.log(JSON.stringify(user, null, 4));
	}
    });
    console.log('bye');

};



function x () {
   console.log('!!! jstest.js: x() called!');
};

function xx () {
    return "xx return value";
};

var y = 5;

export { x, xx, init, y, neo4j_create, neo4j_match, neo4j_match_with_callback};
//export { y };


