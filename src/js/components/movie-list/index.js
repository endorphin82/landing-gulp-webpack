//все что можно сделать со списком
//добавление в дом
//отрисовка, добавление элементов, очистка
//сортировка
import movie from '../movie'

export default class MovieList {
  init (data) {
    this.data = data
    // console.log(this)
  }

  drawToDom (selector) {
    // console.log(this)
    this.selector = selector
    this.clearList(selector)
    selector.appendChild(this.fragment)
  }

  renderMovies (data) {
    this.fragment = document.createDocumentFragment()

    data.forEach(data => {
      const article = document.createElement('article')
      article.classList.add('movie')
      article.classList.add('col-md-4')
      article.innerHTML = movie(data)
      this.fragment.appendChild(article)
    })
  }

  clearList (selector) {
    selector.innerHTML = ''
  }

  sort (filter) {
    const data = [...this.data.results]
    if (filter === 'raiting-max') {
      this.sortByMaxRaiting(data)
      // console.log(data)
    }

    if (filter === 'raiting-min') {
      this.sortByMinRaiting(data)
    }

    if (filter === 'date-new') {
      this.sortByNew(data)
    }
    if (filter === 'date-old') {
      this.sortByOld(data)
    }
  }

  sortByMaxRaiting (data) {
    data.sort((a, b) => {
      if (a.popularity < b.popularity) {
        return 1
      }
      if (a.popularity > b.popularity) {
        return -1
      }
    })
    this.renderMovies(data)
    this.drawToDom(this.selector)
  }

  sortByMinRaiting (data) {
    data.sort((a, b) => {
      if (a.popularity > b.popularity) {
        return 1
      }
      if (a.popularity < b.popularity) {
        return -1
      }
    })
    this.renderMovies(data)
    this.drawToDom(this.selector)
  }

  sortByNew (data) {
    data.sort((a, b) => {
      if (new Date((a.release_date) || (a.first_air_date)) <
        new Date((b.release_date) || (b.first_air_date))) {
        return 1
      }

      if (new Date((a.release_date) || (a.first_air_date)) >
        new Date((b.release_date) || (b.first_air_date))) {
        return -1
      }
    })
    this.renderMovies(data)
    this.drawToDom(this.selector)
  }

  sortByOld (data) {
    data.sort((a, b) => {
      if (new Date((a.release_date) || (a.first_air_date)) >
        new Date((b.release_date) || (b.first_air_date))) {
        return 1
      }

      if (new Date((a.release_date) || (a.first_air_date)) <
        new Date((b.release_date) || (b.first_air_date))) {
        return -1
      }
    })
    this.renderMovies(data)
    this.drawToDom(this.selector)
  }

  // hide () {
  //   this.selector.style.display = 'none'
  // }
}
