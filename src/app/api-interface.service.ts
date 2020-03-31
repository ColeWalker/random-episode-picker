import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { movieDbToken } from '../../credentials';

@Injectable({
  providedIn: 'root'
})
export class ApiInterfaceService {
  series = [];
  contents = [];
  constructor(
    private http: HttpClient
  ) { }


   getDummySearch(){
    return this.http.get("https://api.themoviedb.org/3/search/tv?api_key="+movieDbToken+"&query=frasier&language=en-US&page=1&include_adult=false");     
  }

  searchSeries(series: String){
    return this.http.get(`https://api.themoviedb.org/3/search/tv?api_key=${movieDbToken}&query=${series}&language=en-US&page=1&include_adult=false`);
  }

  getEpisodeList(id, seasonNum){
    return this.http.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}?api_key=${movieDbToken}`);
  }

  getDetailedSeriesInfo(id){
    return this.http.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${movieDbToken}&language=en-US`);
  }

  getEpisodeInfo(id, seasonNum, episodeNum){
    return this.http.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}/episode/${episodeNum}?api_key=${movieDbToken}&language=en-US`)
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
