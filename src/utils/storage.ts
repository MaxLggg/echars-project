import { encode, decode } from './base64';

export default class Storage {

  static getItem<T>(key: string, type: string = 'session'): T {
    const store = this.getStore(type)
    const value = store.getItem(key);
    return value ? JSON.parse(decode(value)) : '';
  }

  static setItem(key: string, value: string | Object, type: string = 'session') {
    const str = typeof value === 'string' ? value : JSON.stringify(value);
    const store = this.getStore(type)
    store.setItem(key, encode(str));
  }

  static removeItem(key: string, type: string = 'session') {
    const store = this.getStore(type)
    store.removeItem(key);
  }

  static clear(type: string = 'session') {
    const store = this.getStore(type)
    store.clear();
  }

  static getStore(type?: string) {
    return type === 'session' ? window.sessionStorage : window.localStorage
  }

}
