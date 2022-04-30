import React from 'react'

const NewsItem = (props)=> {

        let {title, description, imgUrl, newsUrl, date} = props;

        return (
            <div className='my-3'>
                <div className="card">
                    <img src={!imgUrl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfdzqOL1VUPju1eXDlX-UjkZ2OuxrC7ZDcXQ&usqp=CAU":imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small class="text-muted">On {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm yellow">Read more</a>
                    </div>
                </div>
            </div>
        );
}

export default NewsItem
