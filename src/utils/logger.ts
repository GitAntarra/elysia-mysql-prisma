
import chalk from 'chalk';
const error = chalk.red;
const warning = chalk.bgRed; // Orange color

export class XLog{
    log(payload: any){
        console.log(payload)
    }

    error(payload: any){
        console.log({
            id: 1,
            nama: 'andra'
        })
        const result = JSON.stringify(payload);
        const withColor = error(result);
        console.log(typeof withColor);
        console.log(JSON.parse(withColor));
        
        // console.log(JSON.parse(withColor));

    }
}