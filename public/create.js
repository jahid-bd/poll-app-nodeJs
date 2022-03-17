const addOptionBtn = document.getElementById("addOption");

const optionContainer = document.getElementById("options");

let optCount = 3;

addOptionBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let option = createOpt();

  optionContainer.appendChild(option);
});

function createOpt() {
  let div = document.createElement("div");
  div.className = "form-group";
  let input = document.createElement("input");
  input.type = "text";
  input.name = "options";
  input.className = "form-control my-2";
  input.placeholder = "Option " + optCount++;
  div.appendChild(input);

  return div;
}
