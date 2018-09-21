import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ytsearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';

const API_KEY = 'AIzaSyCsQFaUMwqOB-wK-wq2A_R19X91kOaXIBw';



class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            videos : [],
            selectedVideo : null
        };

        this.videoSearch('vadivelu');
    }

    videoSearch(searchTerm){
        ytsearch({key: API_KEY, term:searchTerm}, videos => {
            this.setState({videos, selectedVideo : videos[0]});
        });
    }

    render() {
        const videoSearch = _.debounce((term)=> {this.videoSearch(term)}, 300);
        return (
            <div>
                <SearchBar onSearchTermChange = {videoSearch} />
                <VideoDetail video = {this.state.selectedVideo} />
                <VideoList 
                    videos= {this.state.videos} 
                    onVideoSelect={video => this.setState({selectedVideo : video})} />
            </div>
            );
    }
}
ReactDOM.render(<App />, document.querySelector('.container'));