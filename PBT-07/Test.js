//Câu A2
console.log(typeof null);              // ???
console.log(typeof undefined);         // ???
console.log(typeof NaN);              // ???
console.log("5" + 3);                 // ???
console.log("5" - 3);                 // ???
console.log("5" * "3");              // ???
console.log(true + true);            // ???
console.log([] + []);                // ???
console.log([] + {});                // ???
console.log({} + []);                // ???

// Cau A3
console.log(5 == "5");                // ???
console.log(5 === "5");               // ???
console.log(null == undefined);       // ???
console.log(null === undefined);      // ???
console.log(NaN == NaN);             // ???
console.log(0 == false);             // ???
console.log(0 === false);            // ???
console.log("" == false);            // ???

//Cau A4
if ("0") console.log("A");           // Không in
if ("") console.log("B");            // Không in
if ([]) console.log("C");            // In 
if ({}) console.log("D");            // In 
if (null) console.log("E");          // Không
if (0) console.log("F");             // Không
if (-1) console.log("G");            // In 
if (" ") console.log("H");           // In (space)