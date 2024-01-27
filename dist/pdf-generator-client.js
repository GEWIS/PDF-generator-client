var R = Object.defineProperty;
var C = (n, e, i) => e in n ? R(n, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : n[e] = i;
var s = (n, e, i) => (C(n, typeof e != "symbol" ? e + "" : e, i), i);
class k {
  constructor(e, i) {
    s(this, "http");
    s(this, "baseUrl");
    s(this, "jsonParseReviver");
    this.http = i || window, this.baseUrl = e ?? "/pdf";
  }
  /**
   * @return Ok
   */
  generateContract(e, i) {
    let o = this.baseUrl + "/contract/{type}";
    if (e == null)
      throw new Error("The parameter 'type' must be defined.");
    o = o.replace("{type}", encodeURIComponent("" + e)), o = o.replace(/[?&]$/, "");
    let r = {
      body: JSON.stringify(i),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(o, r).then((h) => this.processGenerateContract(h));
  }
  processGenerateContract(e) {
    const i = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((t, r) => o[r] = t), i === 200 || i === 206) {
      const t = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = t ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(t) : void 0, h = r && r.length > 1 ? r[3] || r[2] : void 0;
      return h ? h = decodeURIComponent(h) : (r = t ? /filename="?([^"]*?)"?(;|$)/g.exec(t) : void 0, h = r && r.length > 1 ? r[1] : void 0), e.blob().then((N) => ({ fileName: h, data: N, status: i, headers: o }));
    } else {
      if (i === 422)
        return e.text().then((t) => {
          let r = null, h = t === "" ? null : JSON.parse(t, this.jsonParseReviver);
          return r = J.fromJS(h), S("Validation Failed", i, t, o, r);
        });
      if (i === 500)
        return e.text().then((t) => {
          let r = null, h = t === "" ? null : JSON.parse(t, this.jsonParseReviver);
          return r = O.fromJS(h), S("Internal Server Error", i, t, o, r);
        });
      if (i !== 200 && i !== 204)
        return e.text().then((t) => S("An unexpected server error occurred.", i, t, o));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generateInvoice(e, i) {
    let o = this.baseUrl + "/invoice/{type}";
    if (e == null)
      throw new Error("The parameter 'type' must be defined.");
    o = o.replace("{type}", encodeURIComponent("" + e)), o = o.replace(/[?&]$/, "");
    let r = {
      body: JSON.stringify(i),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(o, r).then((h) => this.processGenerateInvoice(h));
  }
  processGenerateInvoice(e) {
    const i = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((t, r) => o[r] = t), i === 200 || i === 206) {
      const t = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = t ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(t) : void 0, h = r && r.length > 1 ? r[3] || r[2] : void 0;
      return h ? h = decodeURIComponent(h) : (r = t ? /filename="?([^"]*?)"?(;|$)/g.exec(t) : void 0, h = r && r.length > 1 ? r[1] : void 0), e.blob().then((N) => ({ fileName: h, data: N, status: i, headers: o }));
    } else {
      if (i === 422)
        return e.text().then((t) => {
          let r = null, h = t === "" ? null : JSON.parse(t, this.jsonParseReviver);
          return r = J.fromJS(h), S("Validation Failed", i, t, o, r);
        });
      if (i === 500)
        return e.text().then((t) => {
          let r = null, h = t === "" ? null : JSON.parse(t, this.jsonParseReviver);
          return r = O.fromJS(h), S("Internal Server Error", i, t, o, r);
        });
      if (i !== 200 && i !== 204)
        return e.text().then((t) => S("An unexpected server error occurred.", i, t, o));
    }
    return Promise.resolve(null);
  }
}
class J {
  constructor(e) {
    s(this, "message");
    s(this, "details");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.details = {});
  }
  init(e) {
    if (e && (this.message = e.message, e.details)) {
      this.details = {};
      for (let i in e.details)
        e.details.hasOwnProperty(i) && (this.details[i] = e.details[i]);
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new J();
    return i.init(e), i;
  }
  toJSON(e) {
    if (e = typeof e == "object" ? e : {}, e.message = this.message, this.details) {
      e.details = {};
      for (let i in this.details)
        this.details.hasOwnProperty(i) && (e.details[i] = this.details[i]);
    }
    return e;
  }
}
class O {
  constructor(e) {
    s(this, "message");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.message = e.message);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new O();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.message = this.message, e;
  }
}
var E = /* @__PURE__ */ ((n) => (n.Contract = "contract", n.Quote = "quote", n))(E || {});
class c {
  constructor(e) {
    s(this, "firstName");
    s(this, "lastNamePreposition");
    s(this, "lastName");
    s(this, "fullName");
    s(this, "function");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.firstName = e.firstName, this.lastNamePreposition = e.lastNamePreposition, this.lastName = e.lastName, this.fullName = e.fullName, this.function = e.function);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new c();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.firstName = this.firstName, e.lastNamePreposition = this.lastNamePreposition, e.lastName = this.lastName, e.fullName = this.fullName, e.function = this.function, e;
  }
}
var V = /* @__PURE__ */ ((n) => (n.ZERO = "ZERO", n.LOW = "LOW", n.HIGH = "HIGH", n))(V || {});
class y {
  constructor(e) {
    s(this, "basePrice");
    s(this, "discount");
    s(this, "vatAmount");
    s(this, "vatCategory");
    s(this, "quantity");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.basePrice = e.basePrice, this.discount = e.discount, this.vatAmount = e.vatAmount, this.vatCategory = e.vatCategory, this.quantity = e.quantity);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new y();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.basePrice = this.basePrice, e.discount = this.discount, e.vatAmount = this.vatAmount, e.vatCategory = this.vatCategory, e.quantity = this.quantity, e;
  }
}
class g {
  constructor(e) {
    s(this, "name");
    s(this, "details");
    s(this, "summary");
    s(this, "specification");
    s(this, "pricing");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.pricing = new y());
  }
  init(e) {
    e && (this.name = e.name, this.details = e.details, this.summary = e.summary, this.specification = e.specification, this.pricing = e.pricing ? y.fromJS(e.pricing) : new y());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new g();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.details = this.details, e.summary = this.summary, e.specification = this.specification, e.pricing = this.pricing ? this.pricing.toJSON() : void 0, e;
  }
}
class f {
  constructor(e) {
    s(this, "exclVat");
    s(this, "lowVat");
    s(this, "highVat");
    s(this, "inclVat");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.exclVat = e.exclVat, this.lowVat = e.lowVat, this.highVat = e.highVat, this.inclVat = e.inclVat);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new f();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.exclVat = this.exclVat, e.lowVat = this.lowVat, e.highVat = this.highVat, e.inclVat = this.inclVat, e;
  }
}
class u {
  constructor(e) {
    s(this, "date");
    s(this, "dueDate");
    s(this, "dueDays");
    s(this, "startDate");
    s(this, "endDate");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.date = e.date ? new Date(e.date.toString()) : void 0, this.dueDate = e.dueDate ? new Date(e.dueDate.toString()) : void 0, this.dueDays = e.dueDays, this.startDate = e.startDate ? new Date(e.startDate.toString()) : void 0, this.endDate = e.endDate ? new Date(e.endDate.toString()) : void 0);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new u();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.date = this.date ? this.date.toISOString() : void 0, e.dueDate = this.dueDate ? this.dueDate.toISOString() : void 0, e.dueDays = this.dueDays, e.startDate = this.startDate ? this.startDate.toISOString() : void 0, e.endDate = this.endDate ? this.endDate.toISOString() : void 0, e;
  }
}
class l {
  constructor(e) {
    s(this, "name");
    s(this, "id");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.name = e.name, this.id = e.id);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new l();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.id = this.id, e;
  }
}
class m {
  constructor(e) {
    s(this, "street");
    s(this, "postalCode");
    s(this, "city");
    s(this, "country");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.street = e.street, this.postalCode = e.postalCode, this.city = e.city, this.country = e.country);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new m();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.street = this.street, e.postalCode = this.postalCode, e.city = this.city, e.country = this.country, e;
  }
}
class b {
  constructor(e) {
    s(this, "ourReference");
    s(this, "yourReference");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.ourReference = e.ourReference, this.yourReference = e.yourReference);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new b();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.ourReference = this.ourReference, e.yourReference = this.yourReference, e;
  }
}
class v {
  constructor(e) {
    s(this, "subject");
    s(this, "sender");
    s(this, "recipient");
    s(this, "dates");
    s(this, "company");
    s(this, "address");
    s(this, "reference");
    s(this, "products");
    s(this, "pricing");
    s(this, "firstSignee");
    s(this, "secondSignee");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.sender = new c(), this.recipient = new c(), this.dates = new u(), this.company = new l(), this.address = new m(), this.products = [], this.pricing = new f(), this.firstSignee = new c(), this.secondSignee = new c());
  }
  init(e) {
    if (e) {
      if (this.subject = e.subject, this.sender = e.sender ? c.fromJS(e.sender) : new c(), this.recipient = e.recipient ? c.fromJS(e.recipient) : new c(), this.dates = e.dates ? u.fromJS(e.dates) : new u(), this.company = e.company ? l.fromJS(e.company) : new l(), this.address = e.address ? m.fromJS(e.address) : new m(), this.reference = e.reference ? b.fromJS(e.reference) : void 0, Array.isArray(e.products)) {
        this.products = [];
        for (let i of e.products)
          this.products.push(g.fromJS(i));
      }
      this.pricing = e.pricing ? f.fromJS(e.pricing) : new f(), this.firstSignee = e.firstSignee ? c.fromJS(e.firstSignee) : new c(), this.secondSignee = e.secondSignee ? c.fromJS(e.secondSignee) : new c();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new v();
    return i.init(e), i;
  }
  toJSON(e) {
    if (e = typeof e == "object" ? e : {}, e.subject = this.subject, e.sender = this.sender ? this.sender.toJSON() : void 0, e.recipient = this.recipient ? this.recipient.toJSON() : void 0, e.dates = this.dates ? this.dates.toJSON() : void 0, e.company = this.company ? this.company.toJSON() : void 0, e.address = this.address ? this.address.toJSON() : void 0, e.reference = this.reference ? this.reference.toJSON() : void 0, Array.isArray(this.products)) {
      e.products = [];
      for (let i of this.products)
        e.products.push(i.toJSON());
    }
    return e.pricing = this.pricing ? this.pricing.toJSON() : void 0, e.firstSignee = this.firstSignee ? this.firstSignee.toJSON() : void 0, e.secondSignee = this.secondSignee ? this.secondSignee.toJSON() : void 0, e;
  }
}
var I = /* @__PURE__ */ ((n) => (n.DUTCH = "DUTCH", n.ENGLISH = "ENGLISH", n))(I || {}), x = /* @__PURE__ */ ((n) => (n.PDF = "PDF", n.TEX = "TEX", n))(x || {});
class p {
  constructor(e) {
    s(this, "name");
    s(this, "language");
    s(this, "fileType");
    s(this, "stationery");
    s(this, "createdAt");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.name = e.name, this.language = e.language, this.fileType = e.fileType, this.stationery = e.stationery, this.createdAt = e.createdAt ? new Date(e.createdAt.toString()) : void 0);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new p();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.language = this.language, e.fileType = this.fileType, e.stationery = this.stationery, e.createdAt = this.createdAt ? this.createdAt.toISOString() : void 0, e;
  }
}
class P {
  constructor(e) {
    s(this, "params");
    s(this, "settings");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.params = new v(), this.settings = new p());
  }
  init(e) {
    e && (this.params = e.params ? v.fromJS(e.params) : new v(), this.settings = e.settings ? p.fromJS(e.settings) : new p());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new P();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
var U = /* @__PURE__ */ ((n) => (n.Invoice = "invoice", n.Weeklysales = "weeklysales", n.Creditnota = "creditnota", n))(U || {});
class j {
  constructor(e) {
    s(this, "ourReference");
    s(this, "yourReference");
    s(this, "costCenter");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.ourReference = e.ourReference, this.yourReference = e.yourReference, this.costCenter = e.costCenter);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new j();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.ourReference = this.ourReference, e.yourReference = this.yourReference, e.costCenter = this.costCenter, e;
  }
}
class D {
  constructor(e) {
    s(this, "products");
    s(this, "pricing");
    s(this, "subject");
    s(this, "sender");
    s(this, "recipient");
    s(this, "dates");
    s(this, "company");
    s(this, "address");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.products = [], this.pricing = new f(), this.sender = new c(), this.recipient = new c(), this.dates = new u(), this.company = new l(), this.address = new m());
  }
  init(e) {
    if (e) {
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
      if (Array.isArray(e.products)) {
        this.products = [];
        for (let o of e.products)
          this.products.push(g.fromJS(o));
      }
      this.pricing = e.pricing ? f.fromJS(e.pricing) : new f(), this.subject = e.subject, this.sender = e.sender ? c.fromJS(e.sender) : new c(), this.recipient = e.recipient ? c.fromJS(e.recipient) : new c(), this.dates = e.dates ? u.fromJS(e.dates) : new u(), this.company = e.company ? l.fromJS(e.company) : new l(), this.address = e.address ? m.fromJS(e.address) : new m();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new D();
    return i.init(e), i;
  }
  toJSON(e) {
    e = typeof e == "object" ? e : {};
    for (var i in this)
      this.hasOwnProperty(i) && (e[i] = this[i]);
    if (Array.isArray(this.products)) {
      e.products = [];
      for (let o of this.products)
        e.products.push(o.toJSON());
    }
    return e.pricing = this.pricing ? this.pricing.toJSON() : void 0, e.subject = this.subject, e.sender = this.sender ? this.sender.toJSON() : void 0, e.recipient = this.recipient ? this.recipient.toJSON() : void 0, e.dates = this.dates ? this.dates.toJSON() : void 0, e.company = this.company ? this.company.toJSON() : void 0, e.address = this.address ? this.address.toJSON() : void 0, e;
  }
}
class w {
  constructor(e) {
    s(this, "products");
    s(this, "pricing");
    s(this, "subject");
    s(this, "sender");
    s(this, "recipient");
    s(this, "dates");
    s(this, "company");
    s(this, "address");
    s(this, "summarizedProducts");
    s(this, "reference");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.products = [], this.pricing = new f(), this.sender = new c(), this.recipient = new c(), this.dates = new u(), this.company = new l(), this.address = new m());
  }
  init(e) {
    if (e) {
      if (Array.isArray(e.products)) {
        this.products = [];
        for (let i of e.products)
          this.products.push(g.fromJS(i));
      }
      if (this.pricing = e.pricing ? f.fromJS(e.pricing) : new f(), this.subject = e.subject, this.sender = e.sender ? c.fromJS(e.sender) : new c(), this.recipient = e.recipient ? c.fromJS(e.recipient) : new c(), this.dates = e.dates ? u.fromJS(e.dates) : new u(), this.company = e.company ? l.fromJS(e.company) : new l(), this.address = e.address ? m.fromJS(e.address) : new m(), Array.isArray(e.summarizedProducts)) {
        this.summarizedProducts = [];
        for (let i of e.summarizedProducts)
          this.summarizedProducts.push(g.fromJS(i));
      }
      this.reference = e.reference ? j.fromJS(e.reference) : void 0;
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new w();
    return i.init(e), i;
  }
  toJSON(e) {
    if (e = typeof e == "object" ? e : {}, Array.isArray(this.products)) {
      e.products = [];
      for (let i of this.products)
        e.products.push(i.toJSON());
    }
    if (e.pricing = this.pricing ? this.pricing.toJSON() : void 0, e.subject = this.subject, e.sender = this.sender ? this.sender.toJSON() : void 0, e.recipient = this.recipient ? this.recipient.toJSON() : void 0, e.dates = this.dates ? this.dates.toJSON() : void 0, e.company = this.company ? this.company.toJSON() : void 0, e.address = this.address ? this.address.toJSON() : void 0, Array.isArray(this.summarizedProducts)) {
      e.summarizedProducts = [];
      for (let i of this.summarizedProducts)
        e.summarizedProducts.push(i.toJSON());
    }
    return e.reference = this.reference ? this.reference.toJSON() : void 0, e;
  }
}
class A {
  constructor(e) {
    s(this, "params");
    s(this, "settings");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.params = new w(), this.settings = new p());
  }
  init(e) {
    e && (this.params = e.params ? w.fromJS(e.params) : new w(), this.settings = e.settings ? p.fromJS(e.settings) : new p());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new A();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
var z = /* @__PURE__ */ ((n) => (n.Validation_failed = "Validation failed", n))(z || {}), G = /* @__PURE__ */ ((n) => (n.Internal_Server_Error = "Internal Server Error", n))(G || {});
class H extends Error {
  constructor(i, o, t, r, h) {
    super();
    s(this, "message");
    s(this, "status");
    s(this, "response");
    s(this, "headers");
    s(this, "result");
    s(this, "isApiException", !0);
    this.message = i, this.status = o, this.response = t, this.headers = r, this.result = h;
  }
  static isApiException(i) {
    return i.isApiException === !0;
  }
}
function S(n, e, i, o, t) {
  throw t ?? new H(n, e, i, o, null);
}
export {
  m as Address,
  H as ApiException,
  k as Client,
  l as Company,
  v as ContractParameters,
  P as ContractRouteParams,
  E as ContractType,
  u as Dates,
  p as FileSettings,
  c as Identity,
  O as InternalError,
  G as InternalErrorMessage,
  w as InvoiceParameters,
  j as InvoiceReferences,
  A as InvoiceRouteParams,
  U as InvoiceType,
  I as Language,
  g as Product,
  y as ProductPricing,
  D as Reference__,
  b as References,
  x as ReturnFileType,
  f as TotalPricing,
  V as VAT,
  J as ValidateErrorJSON,
  z as ValidateErrorJSONMessage
};
