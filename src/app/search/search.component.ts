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

  constructor(
    private apiInterfaceService: ApiInterfaceService,
    private formBuilder: FormBuilder,
  ) { 
    this.searchForm= this.formBuilder.group({
      searchString: ""
    })
  }

  ngOnInit(): void {
   this.apiInterfaceService.getDummySearch().subscribe(data => console.log(data['results']));
  }

  async getRandomEpisode(seriesId){
   this.apiInterfaceService.getDetailedSeriesInfo(seriesId).subscribe(data=>{
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
      console.log(randSeason);
      console.log(data['seasons']);
      seasonEpisodeCount=  data['seasons'][randSeasonIndex]["episode_count"];
      randomEpisodeNum =  Math.floor(Math.random() * (seasonEpisodeCount))+1;

      this.apiInterfaceService.getEpisodeInfo(seriesId, randSeason, randomEpisodeNum).subscribe(data=>{
        this.randEp=data;
      });
    });

      
  }



  async onSubmit(query){
    
    this.searchForm.reset();
    this.randEp=null;
    this.apiInterfaceService.searchSeries(query['searchString']).subscribe(data => {
      this.localItems= data['results']
    });
  }



}
