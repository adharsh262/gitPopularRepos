// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {eachApp} = props
  const {id, name, avatarUrl, forksCount, starsCount, issuesCount} = eachApp

  return (
    <li className="listItem1">
      <img src={avatarUrl} alt={id} className="cardAvatarMain" />
      <h1 className="headCard">{name}</h1>
      <ul className="unorderedListCard">
        <li className="listItemCard">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="cardAvatar"
          />
          <p className="paraCard">{starsCount} Stars</p>
        </li>
        <li className="listItemCard">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="cardAvatar"
          />
          <p className="paraCard">{forksCount} </p>
        </li>
        <li className="listItemCard">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="cardAvatar"
          />
          <p className="paraCard">{issuesCount} </p>
        </li>
      </ul>
    </li>
  )
}

export default RepositoryItem
