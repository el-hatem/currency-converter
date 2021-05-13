const api= "https://api.exchangerate.host/latest";

const input = document.querySelector('#input');
const output = document.querySelector('#output');
const from = document.querySelector('#from');
const to = document.querySelector('#to');

var factorTo, factorFrom;
var result;

const getUrl = async(url) => {

	const response = await fetch(url, {
    	credentials: "same-origin",
    	header: {
    		"Content-Type": "application/json"
    	},
    	cors: {
    		enabled: true,
    		policy: {
        		"allow-credentials": true,
        		"allow-origin": `${url}`
        	}
    	  }

    });
	return response.json();
}



input.disabled = true;

getUrl(api).then((response)=>{
	result = response;
	for (let key in response['rates']){
		const optionTo = document.createElement('option');
		const optionFrom = document.createElement('option');
		optionTo.innerHTML = key;
		optionTo.value = key;
		optionFrom.innerHTML = key;
		optionFrom.value = key;
		from.append(optionFrom);
		to.append(optionTo);
	}


});


from.addEventListener('change', ()=> {
	if (from.value != "default" && to.value != "default") {
		input.disabled = false;
		factorFrom = result['rates'][from.value].toFixed(3);
		factorTo = result['rates'][to.value].toFixed(3);


		output.value = ((parseFloat(input.value) * factorTo) / factorFrom).toFixed(3);
	} else {
		input.value = "";
		output.value = "";
		input.disabled = true;
	}
});

to.addEventListener('change', ()=> {
	if (from.value != "default" && to.value != "default") {
		factorFrom = result['rates'][from.value].toFixed(3);
		factorTo = result['rates'][to.value].toFixed(3);


		output.value = ((parseFloat(input.value) * factorTo) / factorFrom).toFixed(3);
		input.disabled = false;
	} else {
		input.value = "";
		output.value = "";
		input.disabled = true;
	}
});


input.addEventListener('keyup', (key)=> {
	if ((key['key'] >= "0" && key['key'] <= "9") || (input.value != "")){
		factorFrom = result['rates'][from.value].toFixed(3);
		factorTo = result['rates'][to.value].toFixed(3);


		output.value = ((parseFloat(input.value) * factorTo) / factorFrom).toFixed(3);
	} else {
		output.value = "";
	}
});
