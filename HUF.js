let fs = require ('fs');
let argv = process.argv;
let str = fs.readFileSync(argv[2], 'utf8');
str.toString();
 
 function Node(letter, freq, used, father, code, leftchild, rightchild, index) {
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.father = father;
    this.code = code;
    this.leftchild = leftchild;
	this.rightchild = rightchild;
    this.index = index;
}
 
let A = new Array();
for (let i = 0; i < str.length; i++) 
    A[str.charAt(i)] = 0;
for (let i = 0; i < str.length; i++) 
    A[str.charAt(i)]++;


let tree = new Array();
let cIn= 0;
for (i in A) {
    let n = new Node(i, A[i], false, null, '', null, null, cIn);
    cIn++;
    tree.push(n);
}
 
let codes = new Array();
pow = tree.length;
if (pow == 1) {
	codes[str.charAt(0)] = '1';
}
else {
	for (let i = 0; i < pow - 1; i++) {
		let min = str.length;
		let mO;
		let mT;
		for (let k = 0; k < tree.length; k++) 
			if (min > tree[k].freq && !tree[k].used) {
				min = tree[k].freq;
				mO = k;
			}
		tree[mO].used = true;
		tree[mO].father = tree.length;
		tree[mO].code = '1';
		min = str.length;
		for (let j = 0; j < tree.length; j++) 
			if (min > tree[j].freq && !tree[j].used) {
				min = tree[j].freq;
				mT = j;
			}
		tree[mT].used = true;
		tree[mT].father = tree.length;
		tree[mT].code = '0';
		let n = new Node(tree[mO].letter + tree[mT].letter, tree[mO].freq + tree[mT].freq, false, null, '', tree[mT].index, tree[mO].index, tree.length)
		tree.push(n);
	}



	
	for (let i = 0; i < pow; i++) {
		codes[tree[i].letter] = '';
		let x = i;
		while (tree[x].father != null) {
			codes[tree[i].letter] = tree[x].code + codes[tree[i].letter];
			x = tree[x].father;
 
		}
	}
}
console.log(codes);

let codedS='';
 
for (i = 0 ; i < str.length; i++) {
    codedS+=codes[str.charAt(i)]
}

console.log(codedS);
 
 
 if (argv[3] != null ) {
	let dec = fs.readFileSync(argv[3], 'utf8');
	dec.toString();
	let decodedS = '';
	
	if (pow == 1){
		 for (let i = 0; i < dec.length; i++)
			 decodedS += str.charAt(0);
	}
	else {
		
		let root = tree[tree.length-1];
		for (let i = 0; i < dec.length; i++) {
			if (dec[i] == "0")
				root = tree[root.leftchild];
			if (dec[i] == "1") 
				root = tree[root.rightchild];
			if (root.leftchild === null && root.rightchild === null) {
				decodedS += root.letter;
				root = tree[tree.length-1];
			}
			
		}
	}

	console.log(decodedS);
 }
 
 
