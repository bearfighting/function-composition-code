class MayBe {
  static of(value) {
    return new MayBe(value);
  }

  constructor(value) {
    this._value = value;
  }

  map(fn) {
    // 处理方法是返回一个值为null的函子
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value));
  }

  apply(mayBeFn) {
    return this.isNothing() || mayBeFn.isNothing()
      ? MayBe.of(null)
      : MayBe.of(mayBeFn._value(this._value));
  }

  // flatmap
  join(monadFn) {
    return this.isNothing()
      ? MayBe.of(null)
      : MayBe.of(monadFn(this._value)._value);
  }

  isNothing() {
    return this._value === null || this._value === undefined;
  }

  unwrap() {
    this._value;
  }
}

function ident(id) {
  return id;
}
let f = MayBe.of(ident);

function identMonad(id) {
  return MayBe.of(id);
}

let r = MayBe.of("Hello world")
  .map(ident)
  .map((e) => e.toUpperCase())
  .apply(f)
  .apply(MayBe.of((e) => e.toLowerCase()))
  // .apply(MayBe.of(null))
  .join(identMonad);

console.log(r);
