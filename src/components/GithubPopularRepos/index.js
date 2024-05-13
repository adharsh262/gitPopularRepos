import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiLoadingStatus = {
  initalView: 'INITIAL_VIEW',
  loadingView: 'LOADING_VIEW',
  successView: 'SUCCESS_VIEW',
  failureView: 'FAILURE_VIEW',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    responseData: [],
    activeTabId: languageFiltersData[0].id,
    loadingStatus: apiLoadingStatus.initalView,
  }

  componentDidMount() {
    this.githubReposApiUrl()
  }

  onClickChangeTab = id => {
    this.setState({activeTabId: id}, this.githubReposApiUrl)
  }

  githubReposApiUrl = async () => {
    const {activeTabId} = this.state

    this.setState({loadingStatus: apiLoadingStatus.loadingView})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.popular_repos.map(eavhApp => ({
        id: eavhApp.id,
        name: eavhApp.name,
        avatarUrl: eavhApp.avatar_url,
        forksCount: eavhApp.forks_count,
        starsCount: eavhApp.stars_count,
        issuesCount: eavhApp.issues_count,
      }))
      this.setState({
        responseData: updatedData,
        loadingStatus: apiLoadingStatus.successView,
      })
    } else if (response.status === 401) {
      this.setState({loadingStatus: apiLoadingStatus.failureView})
    }
  }

  renderSuccessView = () => {
    const {responseData, activeTabId} = this.state

    return (
      <div className="bgContainer">
        <h1 className="main-head">Popular</h1>
        <nav className="navContainer">
          <ul className="unorderList">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                key={eachItem.id}
                language1={eachItem}
                onClickChangeTab={this.onClickChangeTab}
                isTabActive={eachItem.id === activeTabId}
              />
            ))}
          </ul>
        </nav>
        <ul className="unordefrListCArd">
          {responseData.map(eachApp => (
            <RepositoryItem key={eachApp.id} eachApp={eachApp} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => {
    const {activeTabId} = this.state
    return (
      <div className="bgContainer">
        <h1 className="main-head">Popular</h1>
        <nav className="navContainer">
          <ul className="unorderList">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                key={eachItem.id}
                language1={eachItem}
                onClickChangeTab={this.onClickChangeTab}
                isTabActive={eachItem.id === activeTabId}
              />
            ))}
          </ul>
        </nav>
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
        </div>
      </div>
    )
  }

  renderFailureView = () => {
    const {activeTabId} = this.state
    return (
      <div className="bgContainer">
        <h1 className="main-head">Popular</h1>
        <nav className="navContainer">
          <ul className="unorderList">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                key={eachItem.id}
                language1={eachItem}
                onClickChangeTab={this.onClickChangeTab}
                isTabActive={eachItem.id === activeTabId}
              />
            ))}
          </ul>
        </nav>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failureviewImg"
        />
      </div>
    )
  }

  render() {
    const {loadingStatus} = this.state

    switch (loadingStatus) {
      case apiLoadingStatus.loadingView:
        return this.renderLoadingView()
      case apiLoadingStatus.successView:
        return this.renderSuccessView()
      case apiLoadingStatus.failureView:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default GithubPopularRepos
