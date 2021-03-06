import { Component, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from 'angular2/router';
import {HomeComponent} from './home.component';
import {EducationComponent} from './education.component';
import {PortfolioComponent} from './portfolio.component';
import {ContactComponent} from './contact.component';
import {OctodexService} from './octodex.service';

@RouteConfig([
    {
        path: '/Home',
        name: 'Home',
        component: HomeComponent,
        useAsDefault: true
    },
    {
        path: '/Education',
        name: 'Education',
        component: EducationComponent
    },
    {
        path: '/Portfolio',
        name: 'Portfolio',
        component: PortfolioComponent
    },
    {
        path: '/Contact',
        name: 'Contact',
        component: ContactComponent
    }
])

@Component({
    selector: 'jordan-boggs',
    templateUrl: 'app/html/app.component.html',
    styleUrls: ['app/css/app.component.css'],
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [
        ROUTER_PROVIDERS,
        OctodexService
    ],
})

export class AppComponent implements OnInit{
    routeArray:Array<String>;
    selectedPage:String;
    
    constructor(private router:Router){
        this.routeArray = ['Home', 'Education', 'Portfolio', 'Contact'];
        this.selectedPage = this.getCurrentPage();
    }
    
    ngOnInit() {
        this.router.subscribe((newPage) => 
            this.selectedPage = this.getCurrentPage()
        );
    }
    
    leftArrowClick() {
        let currentPage = this.getCurrentPage();
        
        let nextPage = this.routeArray.indexOf(currentPage) - 1;
        
        if(nextPage < 0) {
            nextPage = 3;
        }
        
        this.router.navigate([this.routeArray[nextPage]]);
    }
    rightArrowClick() {
        let currentPage = this.getCurrentPage();
        
        let nextPage = this.routeArray.indexOf(currentPage) + 1;
        
        if(nextPage > 3) {
            nextPage = 0;
        }
        
        this.router.navigate([this.routeArray[nextPage]]);   
    }
    
    getCurrentPage() {
        let baseUrl = window.location.protocol + '//' + window.location.host + '/';
        let fullUrl = window.location.href;
        return fullUrl.replace(baseUrl, '');
    }       
}