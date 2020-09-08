# Setting Up angu;ar material

- [Setting Up angu;ar material](#setting-up-anguar-material)
  - [Instalaltion](#instalaltion)
  - [Steps to use](#steps-to-use)

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