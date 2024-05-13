// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {language1, onClickChangeTab, isTabActive} = props
  const {id, language} = language1

  const onChangeTab = () => {
    onClickChangeTab(id)
  }

  const realActive = isTabActive ? 'styling' : ''

  return (
    <li className="listItem">
      <button
        type="button"
        onClick={onChangeTab}
        className={`btnEl ${realActive}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
