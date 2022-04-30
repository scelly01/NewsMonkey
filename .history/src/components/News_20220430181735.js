import React, {Component} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 12,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    
    async updateNews(){
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7fff832a0e2c4198ac80f1b4593fd02f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    async componentDidMount(){
        this.updateNews();
    }

    handlePrevClick = async ()=>{
         this.setState({page: this.state.page-1}, ()=>{this.updateNews()});
    }

    handleNextClick = async ()=>{
         this.setState({page: this.state.page+1}, ()=>{this.updateNews()}); 
    }


    render() {

        return (
            <div className="container my-3">
                <h1 className="text-center" style={{padding:'40px', marginTop:'90px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                 <div className="row">
                    {!this.state.loading && this.state.articles.map(
                        (element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem 
                                    title={element.title}
                                    description={element.description} 
                                    imgUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    date={element.publishedAt}
                                    />
                            </div>}
                            )
                    }
                 </div>
                 {!this.state.loading && <div className="container d-flex justify-content-between" style={{padding:'30px 5px'}}>
                     <button disabled={this.state.page <=1}type="button" className="btn yellow" onClick={this.handlePrevClick}>&larr; Previous </button>
                     <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}> Next &rarr;</button>
                 </div>}
                
            </div>
                );
    }
}

export default News
