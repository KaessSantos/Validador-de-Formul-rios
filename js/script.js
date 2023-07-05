'user strict'

let c = (e)=> document.querySelector(e);
let cs = (e)=> document.querySelectorAll(e);

let b7Validator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true

        let inputs = form.querySelectorAll('input')


        b7Validator.clearErros();

        for(let i = 0; i < inputs.length; i++){
            let input = inputs[i];
            let check = b7Validator.checkInput(input)
            if(check !== true){
                send = false 
                b7Validator.showError(input, check)
            }
        }
        

        if(send){
            form.submit();
        }
    },

    checkInput:(input)=>{
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split('|')
            for(let k in rules){
                let rDetails = rules[k].split('=');
                switch(rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Campo não pode ser vazio.'
                        }
                    break;

                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'Campo deve ter pelo menos '+ rDetails[1] + ' caracteres'
                        }
                    break;

                }
            }
        }

        return true
    },

    showError:(input, error)=>{
        input.style.borderColor = '#ff0000'


        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },

    clearErros:()=>{
        let inputs = form.querySelectorAll('input');
        for(let i=0; i<inputs.length; i++){
            inputs[i].style = '';
        }

        let errorElements = cs('.error')
        for(let i = 0; i<errorElements.length; i++){
            errorElements[i].remove();
        }
    }


};

let form = c('.b7validator')

form.addEventListener('submit', b7Validator.handleSubmit);

