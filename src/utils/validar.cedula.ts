import { FormControl } from "@angular/forms";

export class ValidarCedula {
    public static calcularNumero(value = ""): number | undefined {
        if (!(/^\d+$/.test(value))) return;
        const isEven = (num = 0) => (num % 2 == 0);
        let sum = 0;
        for (let i = 0; i < value.length; i++) {
            let digit = parseInt(value[i]);
            if (isEven(i))
                sum += (digit * 2) >= 10 ? (digit * 2) - 9 : (digit * 2);
            else
                sum += digit;
        }
        let num = (sum % 10) === 0 ? 0 : 10 - (sum % 10);
        return num;
    }

    public static esValido(value = ""): boolean {
        if (!(/^\d+$/.test(value))) return false;
        let toCheck = this.calcularNumero(value.substr(0, value.length - 1));
        if (toCheck === parseInt(value[value.length - 1]))
            return true;
        return false;

    }

    public static cedulaNoValida(control: FormControl) {
        const identificacion = control.value;
        if (!identificacion || identificacion.length < 10) return Promise.resolve({ cedulaNoValida: true });
        return new Promise((resolve, _) => {
            setTimeout(() => {
                if (!ValidarCedula.esValido(identificacion))
                    resolve({ cedulaNoValida: true });
                else
                    resolve(null);
            }, 1);
        });
    }
}