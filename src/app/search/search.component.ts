import { Component, OnInit } from '@angular/core';
import {ApiInterfaceService} from '../api-interface.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  localItems;
  searchForm;
  randEp;
  selectedSeriesInfo;
  isCollapsed: boolean = false;
  currentText: String;
  isCollapsible: boolean = false;

  constructor(
    private apiInterfaceService: ApiInterfaceService,
    private formBuilder: FormBuilder,
  ) { 
    this.searchForm= this.formBuilder.group({
      searchString: ""
    })
  }

  ngOnInit(): void {
   
  }

  async getRandomEpisode(seriesId){
   this.apiInterfaceService.getDetailedSeriesInfo(seriesId).subscribe(data=>{
      this.selectedSeriesInfo = {
        id:seriesId,
        seasons: data['seasons'],
      }

      let randSeason: number = 1, randSeasonIndex = 0;
      let seasonEpisodeCount: number;
      let randomEpisodeNum: number = 1;
      let seasonCount: number;
      
      seasonCount = data['seasons'].length - 1;
      randSeason =  Math.floor(Math.random() * (seasonCount)) + 1;

      //if there isn't a choice, set it to 1
      if(seasonCount===0){
        randSeason= 1;
      }

      randSeasonIndex= randSeason-1;

      seasonEpisodeCount=  data['seasons'][randSeasonIndex]["episode_count"];
      randomEpisodeNum =  Math.floor(Math.random() * (seasonEpisodeCount))+1;

      this.apiInterfaceService.getEpisodeInfo(seriesId, randSeason, randomEpisodeNum).subscribe(data=>{
        this.randEp=data;
        this.currentText=this.randEp.overview;
        this.collapseText();
      });
    });
 
  }

  getAnotherRandomEpisode(){
    let randSeason: number = 1, randSeasonIndex = 0;
    let seasonEpisodeCount: number;
    let randomEpisodeNum: number = 1;
    let seasonCount: number;
      
    seasonCount = this.selectedSeriesInfo['seasons'].length - 1;
    randSeason =  Math.floor(Math.random() * (seasonCount)) + 1;

    //if there isn't a choice, set it to 1
    if(seasonCount===0){
      randSeason= 1;
    }

    randSeasonIndex= randSeason-1;

    seasonEpisodeCount=  this.selectedSeriesInfo['seasons'][randSeasonIndex]["episode_count"];
    randomEpisodeNum =  Math.floor(Math.random() * (seasonEpisodeCount))+1;

    this.apiInterfaceService.getEpisodeInfo(this.selectedSeriesInfo['id'], randSeason, randomEpisodeNum).subscribe(data=>{
      this.randEp=data;
      this.currentText=this.randEp.overview;
      this.isCollapsed=false;
      this.isCollapsible=false;
      this.collapseText();
    });
  }

  toggleView(){
    this.isCollapsed = !this.isCollapsed;
    if(this.isCollapsed){
      this.currentText= this.randEp.overview.substring(0,250).trim();
    }
    else{
      this.currentText = this.randEp.overview;
    }
  }

  collapseText(){
    if(this.currentText.length>=250 && this.currentText[this.currentText.length-1]!=" " || this.currentText[this.currentText.length-1]!="."){
      this.isCollapsed=true;
      this.isCollapsible=true;
    }
    if(this.isCollapsed==true){
      this.currentText= this.randEp.overview.substring(0, 250).trim();
    }
    else{
      this.currentText= this.randEp.overview;
    }
  }

  async onSubmit(query){
    
    this.searchForm.reset();
    this.randEp=null;
    this.selectedSeriesInfo=null;
    this.apiInterfaceService.searchSeries(query['searchString']).subscribe(data => {
      this.localItems= data['results']
    });
  }




}
