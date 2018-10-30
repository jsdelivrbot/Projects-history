import {API, CodeGen} from './Main.jsx'

export default
{
  loadPosts ({ page, pageSize, category, templateType })
  {
    let request =
      `community/posts`
      + (category ? `/${ category }` : '')
      + `?page=${ page || 1 }`
      + `&pagesize=${ pageSize || 5 }`
      + (templateType ? `&templatetype=${ templateType }` : '')

    return API.get(request)
  }
}
