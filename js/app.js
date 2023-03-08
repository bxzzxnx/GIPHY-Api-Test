const form = document.querySelector('.form');
const divSaida = document.querySelector('.out')
const topButton = document.querySelector('.top')

const KEY = '';

const fetchGif = async (userInput) => {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${KEY}&limit=1&q=${userInput}`)
    if (!response.ok) {
      throw new Error('Não foi possível acessar os dados')
    }
    return response.json()
  } catch (error) {
    alert(error.message)
  }
}

const createFigure = (data) =>{
  const img = document.createElement('img')
  img.setAttribute('src', data[0].images.downsized.url)
  img.setAttribute('alt', data[0].title)
  return img
}

const insertImage = async input =>{
  const {data} = await fetchGif(input)
  if (data) {
    const img = createFigure(data)
    divSaida.insertAdjacentElement('afterbegin', img)
  }
}

form.addEventListener('submit',  event =>{
  const input = event.target.search.value;
  event.preventDefault()
  form.reset()
  insertImage(input)
});

const showButton = () =>{
  if (window.scrollY){
    topButton.classList.add('visible')
  }
  else{
    topButton.classList.remove('visible')
  }
}

const toTop = () =>{
  scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
}

window.addEventListener('scroll', showButton)
topButton.addEventListener('click', toTop)