import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoviesService } from 'src/app/movies.service';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent implements OnInit {
  @Input() movieId: number;
  movieDetails: any;
  movieCrew: any[];
  movieCast: any[];
  hours: number;

  constructor(
    private modalCtrl: ModalController,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.getMovieDetails(this.movieId);
    this.getMovieCrew(this.movieId);
    this.getMovieCast(this.movieId);
  }

  getMovieDetails(movieId: number) {
    this.moviesService.fetchMovieDetails(movieId).subscribe((res: any) => {
      this.movieDetails = res;
      this.hours = Math.floor(this.movieDetails.runtime / 60);
    });
  }

  getMovieCrew(movieId: number) {
    this.moviesService.fetchMovieCrew(movieId).subscribe((res: any) => {
      this.movieCrew = res;
    });
  }

  getMovieCast(movieId: number) {
    this.moviesService.fetchMovieCast(movieId).subscribe((res: any) => {
      this.movieCast = res;
    });
  }

  onModalClose() {
    this.modalCtrl.dismiss();
  }
}
