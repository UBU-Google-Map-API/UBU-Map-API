import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  // styleUrls: ['./videos.component.css']
})

export class VideosComponent implements OnInit {
  constructor(
    private UserService: UserService,
    private route: ActivatedRoute,
    private postService: PostsService,
    ) { }

  // videoIcon: string = "./assets/images/play.png";
  // play: string = "Play";
  // videodisabled: boolean = true;

  // details: any;
  // userName: string;

  ngOnInit(): void {
    
    
  }

  // changeImg() {
  //   if (this.play == "Play") {
  //     this.play = "Pause",
  //       this.videoIcon = "./assets/images/pause.png",
  //       this.videodisabled = false
  //   }
  //   else {
  //     this.videoIcon = "./assets/images/play.png",
  //       this.play = "Play",
  //       this.videodisabled = true
  //   }
  // }


}
