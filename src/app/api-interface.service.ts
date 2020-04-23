import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiInterfaceService {
  series = [];
  contents = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }
  constructor(
    private http: HttpClient
  ) { }


  //  getDummySearch(){
  //   return this.http.get("https://api.themoviedb.org/3/search/tv?api_key="+movieDbToken+"&query=frasier&language=en-US&page=1&include_adult=false");     
  // }
    
  searchSeries(series: String){
    
    // return this.http.get(`https://api.themoviedb.org/3/search/tv?api_key=${movieDbToken}&query=${series}&language=en-US&page=1&include_adult=false`);
    // return this.http.get(`http://localhost:3030/search?series=${series}`, this.httpOptions);
    return this.http.get(`https://random-episode-picker-api.herokuapp.com/search?series=${series}`, this.httpOptions);
  }

  getEpisodeList(id, seasonNum){
    // return this.http.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}?api_key=${movieDbToken}`);
    // return this.http.get(`http://localhost:3030/episodes?id=${id}&season_num=${seasonNum}`, this.httpOptions);
    return this.http.get(`https://random-episode-picker-api.herokuapp.com/episodes?id=${id}&season_num=${seasonNum}`, this.httpOptions);
  }

  getDetailedSeriesInfo(id){
    // return this.http.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${movieDbToken}&language=en-US`);
    // return this.http.get(`http://localhost:3030/series?id=${id}`, this.httpOptions);
    return this.http.get(`https://random-episode-picker-api.herokuapp.com/series?id=${id}`, this.httpOptions);
  }

  getEpisodeInfo(id, seasonNum, episodeNum){
    // return this.http.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}/episode/${episodeNum}?api_key=${movieDbToken}&language=en-US`)
    // return this.http.get(`http://localhost:3030/episode?id=${id}&season_num=${seasonNum}&episode_num=${episodeNum}`, this.httpOptions);
    return this.http.get(`https://random-episode-picker-api.herokuapp.com/episode?id=${id}&season_num=${seasonNum}&episode_num=${episodeNum}`, this.httpOptions);
  }

  addSeries(series){
    this.series.push(series);
  }

  getSeries(){
    return this.series;
  }

  clearSeries(){
    this.series= [];
    return this.series;
  }
}
