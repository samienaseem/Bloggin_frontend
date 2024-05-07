// src/app/components/blog-card/blog-card.component.ts
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BlogService } from "src/app/services/blog.service";
import { LoginResponse, UserService } from "src/app/services/user.service";
import { Post } from "../../models/post";

class Vm {
  blogList: Post[];
  status: boolean;

  

  constructor() {
    this.blogList = [];
    this.status = false;
  }
}

@Component({
  selector: "app-blog-card",
  templateUrl: "./blog-card.component.html",
  styleUrls: ["./blog-card.component.scss"],
})
export class BlogCardComponent implements OnInit {
  vm$: Observable<Vm>;
  config: any;
  pageSizeOptions = [2, 4, 6];
  likedPosts: { [key: string]: boolean } = {};
  currentUser: LoginResponse['userResponse'] | null = null;

  isLoggedIn = false;
  title = "";
  content = "";
  message = "";

  constructor(
    private blogService: BlogService,
    private userService: UserService
  ) {
    const pageSize = sessionStorage.getItem("pageSize");
    this.config = {
      currentPage: 1,
      itemsPerPage: pageSize ? +pageSize : this.pageSizeOptions[0],
    };
  }

  ngOnInit() {
    this.isLoggedIn = !!this.userService.getToken();
    this.currentUser = this.userService.getUser();
    this.fetchBlogs();
    // Fetch the data and map it into the Vm (ViewModel)
  }

  fetchBlogs() {
    this.vm$ = this.blogService.getAllPosts().pipe(
      map((response: any) => {
        let blogVm = new Vm();
        blogVm.status = response.status;
        blogVm.blogList = response.blogPosts.map((post: any) => ({
          postId: post.id.toString(),
          title: post.title,
          content: post.content,
          author: "", // Set author if necessary
          createdDate: new Date(), // Adjust this if the date is formatted differently
        }));
        return blogVm;
      })
    );
  }

  toggleLike(postId: string) {
    this.likedPosts[postId] = !this.likedPosts[postId];
    console.log(`Like status for post ${postId}: ${this.likedPosts[postId]}`);
  }

  delete(postId: string) {
    if (confirm("Are you sure?")) {
      // Call delete API, then handle the UI update
      this.blogService.deletePost(postId).subscribe(() => {
        console.log(`Post ${postId} deleted successfully`);
      });
    }
  }

  addComment(postId: string, commentText: string) {
    // Add logic to handle comment posting here
    console.log(`Adding comment to post ${postId}: ${commentText}`);
  }

  createPost() {
    if (!this.title || !this.content) {
      this.message =
        "Please provide both a title and content for the blog post.";
      return;
    }
   

    const userId = this.currentUser.id // Replace with actual user ID or get it from a user service

    const blogData = {
      title: this.title,
      content: this.content,
      user: { id: userId },
    };

    this.blogService.createPost(blogData).subscribe(
      (response) => {
        this.message = "Post created successfully!";
        this.fetchBlogs(); // Refresh blog list after adding a new post
      },
      (error) => {
        this.message = "Failed to create post. Please try again.";
        console.error("Error creating post:", error);
      }
    );
  }
}
