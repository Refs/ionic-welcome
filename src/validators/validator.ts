import { ValidatorFn, AbstractControl, FormGroup, FormControl } from "@angular/forms";

// 一种方式时直接创建验证函数，而另外一种方式是去创建 验证函数的工厂函数， obviously set up a factory function is better;

/**
 * 敏感词汇过滤
 *
 * @export
 * @param {RegExp} nameRe
 * @returns {ValidatorFn}
 */
export function forbiddenNameValidator(nameRe: RegExp) : ValidatorFn {
  return (control: AbstractControl): {[key:string]: any} => {
    const forbidden = nameRe.test(control.value);
    // if pass validator, we'll return null, or {[key: string]:any}
    // the code below logic is 如果 禁止 成立，则就返回一个对象，用来说明校验不通过，否则禁止不成立，则校验通过；
    return forbidden ? {'forbiddenName': {value: control.value}} : null
  }
}

// 上述的校验 用来去过滤一些敏感词汇， 如果含有敏感词汇， 则校验不通过，反之通过；


/**
 * 格式校验
 *
 * @export
 * @param {RegExp} nameRe
 * @returns {ValidatorFn}
 */
export function formatValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any}=> {
    const wellFormat = nameRe.test(control.value);
    return wellFormat ? null : {'format': {value: control.value}};
  }
}

/**
 * 验证一个formGroup下的两个formControl是否相等; 通常用于密码与确认密码；
 *
 * @export
 * @param {string} controlName1
 * @param {string} controlName2
 * @returns {ValidatorFn}
 */
export function equalValidator(controlName1:string, controlName2: string): ValidatorFn {
  return (formGroup: FormGroup) : {[key: string]:any} => {
    let formControl1 = formGroup.get(controlName1) as FormControl ;
    let formControl2 = <FormControl>formGroup.get(controlName2);
    const equal = formControl1.value == formControl2.value;
    return  equal ? null : {'equal': {value: formGroup.value}};
  }
}
