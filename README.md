# Setting Up angu;ar material

- [Setting Up angu;ar material](#setting-up-anguar-material)
  - [Deployment](#deployment)
  - [Instalaltion](#instalaltion)
  - [Steps to use](#steps-to-use)
  - [fxLayout](#fxlayout)
  - [Angular Fire](#angular-fire)
  - [State management using RxjS](#state-management-using-rxjs)
  - [Redux](#redux)
  - [Steps to Implement redux](#steps-to-implement-redux)

## Deployment
View deployment at https://gagandeep39.github.io/angular-fitness-tracker/

## Instalaltion 
`ng add @angular/material`

## Steps to use
1. Create a separate module for importing all matrial components
```ts
@NgModule({
  imports: [MatButtonModule],
  exports: [MatButtonModule],
})
export class MaterialDemoModule {}
```
2. Import the module in main module
`imports: [MaterialDemoModule]`
3. Start using button module inside the code
`<button mat-button>Basic</button>`
**NOTE** To prevent errors on importing a material module, Restart the server after importing a new material module or try running npm install

## fxLayout
- `fxLayout="row"` All elements are on a same row
- `fxLayout="column"` All elements are on different line
- `fxLayout` All elements are on diferent line (Column behaviour)

## Angular Fire
- Allows connecting angular app to firebase with complete integration
- Uses Observable based data streams
- Install using `ng add @angular/fire`
- Inernaly manages  token while sending/recieving requests from server

## State management using RxjS
1. Execution of certain Event (button click)
2. State change even execition
3. Emitting an event using rxjs (Observable)
4. Listen to event (Subscription)
5. Update UI

## Redux 
- Central store to store something
- Consists of action, reducer, store
- We dispatch action to modify reducer state
- Installing
  - Automatic configuratin `ng add @ngrx/store@latest`
  - Manual `npm install @ngrx/store --save`

## Steps to Implement redux
1. Create an initial state
```ts
const initialState = {
  isLoading: false,
};
```
2. Create a reducer
```ts
export function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'START_LOADING':
      return {
        isLoading: true,
      };
    case 'STOP_LOADING':
      return {
        isLoading: false,
      };
    default:
      return state;
  }
}
```
3.Imprort it in `app.module`
```ts
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';
@NgModule({
  imports: [
    StoreModule.forRoot({ ui: appReducer }),
  ]
})
```
4. Use it in actual code
