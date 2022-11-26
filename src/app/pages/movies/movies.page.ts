import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MoviesService } from 'src/app/movies.service';
import { Movie } from 'src/app/store/movie.model';
import { DetailsModalComponent } from '../details-modal/details-modal.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: Observable<{ movies: Movie[] }>;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private store: Store<{ movies: { movies: Movie[] } }>
  ) {
    this.movies = this.store.select('movies');
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.moviesService.getPopularMovies().subscribe();
  }

  async onOpenDetails(movieId: number) {
    const detailsModal = await this.modalCtrl.create({
      component: DetailsModalComponent,
      componentProps: { movieId },
    });
    return await detailsModal.present();
  }
}
