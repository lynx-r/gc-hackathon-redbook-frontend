import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Feature, YMap } from '@yandex/ymaps3-types';
import { YMapDefaultMarkerProps } from '@yandex/ymaps3-types/packages/markers';
import {
  YMapComponent,
  YMapDefaultFeaturesLayerDirective,
  YMapDefaultMarkerDirective,
  YMapDefaultSchemeLayerDirective,
  YReadyEvent,
} from 'angular-yandex-maps-v3';
import { LOCATION, PARKS_SEARCH_LIMIT, PARKS_SEARCH_TEXT } from '../constants';
import { emptyPoint } from '../factories/empty';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgFor,
    RouterOutlet,
    YMapComponent,
    YMapDefaultFeaturesLayerDirective,
    YMapDefaultSchemeLayerDirective,
    YMapDefaultMarkerDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  map: any;
  title = 'hack';
  parkMarkers: YMapDefaultMarkerProps[] = [];
  selectedPark: Feature | null = null;
  location = LOCATION;
  test = 'a';
  data: any = {};
  fileToUpload: File | null = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get('http://localhost:1337/api/animals')
      .subscribe((animals: any) => {
        // process the configuration.
        console.log(animals);
        this.data = JSON.stringify(animals.data);
      });
  }

  async onMapReady(event: YReadyEvent<YMap>) {
    const { ymaps3, entity } = event;
    const parks = await ymaps3.search({
      text: PARKS_SEARCH_TEXT,
      limit: PARKS_SEARCH_LIMIT,
      type: ['businesses'],
    });
    if (parks.length) {
      this.location.center = parks[0].geometry?.coordinates || [0, 0];
    }

    this.parkMarkers = parks.map((park): YMapDefaultMarkerProps => {
      const { geometry = emptyPoint(), properties } = park;
      return {
        coordinates: geometry.coordinates,
        title: properties.name,
        subtitle: properties.description,
        onClick: () => this.handleSelectPark(park),
      };
    });
    this.test = 'b';
    console.log(this.parkMarkers);
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files.item(0);
    console.log(this.fileToUpload);
    if (!this.fileToUpload) {
      return;
    }
    this.postFile(this.fileToUpload).subscribe((res) => {
      console.log(res);
      return true;
    });
  }

  postFile(fileToUpload: File) {
    const endpoint = 'https://worthy-tick-noticeably.ngrok-free.app/classify';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(endpoint, formData, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
  }

  click() {
    this.test = 't';
  }

  handleSelectPark(park: Feature) {
    this.selectedPark = park;
  }
}
