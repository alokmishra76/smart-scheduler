import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'calender',
        pathMatch: 'full'
    }, {
        path: 'calender',
        loadChildren: () => import('./calender/calender.routes').then(m => m.CALENDER_ROUTE)
    }
];
