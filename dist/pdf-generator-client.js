var A = Object.defineProperty;
var R = (n, e, i) => e in n ? A(n, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : n[e] = i;
var t = (n, e, i) => (R(n, typeof e != "symbol" ? e + "" : e, i), i);
class q {
  constructor(e, i) {
    t(this, "http");
    t(this, "baseUrl");
    t(this, "jsonParseReviver");
    this.http = i || window, this.baseUrl = e ?? "/pdf";
  }
  /**
   * @return Created
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
    return this.http.fetch(o, r).then((c) => this.processGenerateContract(c));
  }
  processGenerateContract(e) {
    const i = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => o[r] = s), i === 201) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, c = r && r.length > 1 ? r[3] || r[2] : void 0;
      return c ? c = decodeURIComponent(c) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, c = r && r.length > 1 ? r[1] : void 0), e.blob().then((N) => ({ fileName: c, data: N, status: i, headers: o }));
    } else {
      if (i === 422)
        return e.text().then((s) => {
          let r = null, c = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(c), S("Validation Failed", i, s, o, r);
        });
      if (i === 500)
        return e.text().then((s) => {
          let r = null, c = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = O.fromJS(c), S("Internal Server Error", i, s, o, r);
        });
      if (i !== 200 && i !== 204)
        return e.text().then((s) => S("An unexpected server error occurred.", i, s, o));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Created
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
    return this.http.fetch(o, r).then((c) => this.processGenerateInvoice(c));
  }
  processGenerateInvoice(e) {
    const i = e.status;
    let o = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => o[r] = s), i === 201) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, c = r && r.length > 1 ? r[3] || r[2] : void 0;
      return c ? c = decodeURIComponent(c) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, c = r && r.length > 1 ? r[1] : void 0), e.blob().then((N) => ({ fileName: c, data: N, status: i, headers: o }));
    } else {
      if (i === 422)
        return e.text().then((s) => {
          let r = null, c = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(c), S("Validation Failed", i, s, o, r);
        });
      if (i === 500)
        return e.text().then((s) => {
          let r = null, c = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = O.fromJS(c), S("Internal Server Error", i, s, o, r);
        });
      if (i !== 200 && i !== 204)
        return e.text().then((s) => S("An unexpected server error occurred.", i, s, o));
    }
    return Promise.resolve(null);
  }
}
class J {
  constructor(e) {
    t(this, "message");
    t(this, "details");
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
    t(this, "message");
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
var C = /* @__PURE__ */ ((n) => (n.Contract = "contract", n.Quote = "quote", n))(C || {});
class h {
  constructor(e) {
    t(this, "firstName");
    t(this, "lastNamePreposition");
    t(this, "lastName");
    t(this, "fullName");
    t(this, "function");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.firstName = e.firstName, this.lastNamePreposition = e.lastNamePreposition, this.lastName = e.lastName, this.fullName = e.fullName, this.function = e.function);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new h();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.firstName = this.firstName, e.lastNamePreposition = this.lastNamePreposition, e.lastName = this.lastName, e.fullName = this.fullName, e.function = this.function, e;
  }
}
var E = /* @__PURE__ */ ((n) => (n.ZERO = "ZERO", n.LOW = "LOW", n.HIGH = "HIGH", n))(E || {});
class g {
  constructor(e) {
    t(this, "basePrice");
    t(this, "discount");
    t(this, "vatAmount");
    t(this, "vatCategory");
    t(this, "quantity");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.basePrice = e.basePrice, this.discount = e.discount, this.vatAmount = e.vatAmount, this.vatCategory = e.vatCategory, this.quantity = e.quantity);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new g();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.basePrice = this.basePrice, e.discount = this.discount, e.vatAmount = this.vatAmount, e.vatCategory = this.vatCategory, e.quantity = this.quantity, e;
  }
}
class w {
  constructor(e) {
    t(this, "name");
    t(this, "details");
    t(this, "summary");
    t(this, "specification");
    t(this, "pricing");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.pricing = new g());
  }
  init(e) {
    e && (this.name = e.name, this.details = e.details, this.summary = e.summary, this.specification = e.specification, this.pricing = e.pricing ? g.fromJS(e.pricing) : new g());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new w();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.details = this.details, e.summary = this.summary, e.specification = this.specification, e.pricing = this.pricing ? this.pricing.toJSON() : void 0, e;
  }
}
class f {
  constructor(e) {
    t(this, "exclVat");
    t(this, "lowVat");
    t(this, "highVat");
    t(this, "inclVat");
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
    t(this, "date");
    t(this, "dueDate");
    t(this, "dueDays");
    t(this, "startDate");
    t(this, "endDate");
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
    t(this, "name");
    t(this, "id");
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
    t(this, "street");
    t(this, "postalCode");
    t(this, "city");
    t(this, "country");
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
    t(this, "ourReference");
    t(this, "yourReference");
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
class y {
  constructor(e) {
    t(this, "subject");
    t(this, "sender");
    t(this, "recipient");
    t(this, "dates");
    t(this, "company");
    t(this, "address");
    t(this, "reference");
    t(this, "products");
    t(this, "pricing");
    t(this, "firstSignee");
    t(this, "secondSignee");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.sender = new h(), this.recipient = new h(), this.dates = new u(), this.company = new l(), this.address = new m(), this.products = [], this.pricing = new f(), this.firstSignee = new h(), this.secondSignee = new h());
  }
  init(e) {
    if (e) {
      if (this.subject = e.subject, this.sender = e.sender ? h.fromJS(e.sender) : new h(), this.recipient = e.recipient ? h.fromJS(e.recipient) : new h(), this.dates = e.dates ? u.fromJS(e.dates) : new u(), this.company = e.company ? l.fromJS(e.company) : new l(), this.address = e.address ? m.fromJS(e.address) : new m(), this.reference = e.reference ? b.fromJS(e.reference) : void 0, Array.isArray(e.products)) {
        this.products = [];
        for (let i of e.products)
          this.products.push(w.fromJS(i));
      }
      this.pricing = e.pricing ? f.fromJS(e.pricing) : new f(), this.firstSignee = e.firstSignee ? h.fromJS(e.firstSignee) : new h(), this.secondSignee = e.secondSignee ? h.fromJS(e.secondSignee) : new h();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new y();
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
var V = /* @__PURE__ */ ((n) => (n.DUTCH = "DUTCH", n.ENGLISH = "ENGLISH", n))(V || {}), I = /* @__PURE__ */ ((n) => (n.PDF = "PDF", n.TEX = "TEX", n))(I || {});
class p {
  constructor(e) {
    t(this, "name");
    t(this, "language");
    t(this, "fileType");
    t(this, "stationery");
    t(this, "createdAt");
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
    t(this, "params");
    t(this, "settings");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.params = new y(), this.settings = new p());
  }
  init(e) {
    e && (this.params = e.params ? y.fromJS(e.params) : new y(), this.settings = e.settings ? p.fromJS(e.settings) : new p());
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
var x = /* @__PURE__ */ ((n) => (n.Invoice = "invoice", n.Weeklysales = "weeklysales", n.Creditnota = "creditnota", n))(x || {});
class j {
  constructor(e) {
    t(this, "ourReference");
    t(this, "yourReference");
    t(this, "costCenter");
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
class v {
  constructor(e) {
    t(this, "summarizedProducts");
    t(this, "reference");
    t(this, "products");
    t(this, "pricing");
    t(this, "subject");
    t(this, "sender");
    t(this, "recipient");
    t(this, "dates");
    t(this, "company");
    t(this, "address");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.products = [], this.pricing = new f(), this.sender = new h(), this.recipient = new h(), this.dates = new u(), this.company = new l(), this.address = new m());
  }
  init(e) {
    if (e) {
      if (Array.isArray(e.summarizedProducts)) {
        this.summarizedProducts = [];
        for (let i of e.summarizedProducts)
          this.summarizedProducts.push(w.fromJS(i));
      }
      if (this.reference = e.reference ? j.fromJS(e.reference) : void 0, Array.isArray(e.products)) {
        this.products = [];
        for (let i of e.products)
          this.products.push(w.fromJS(i));
      }
      this.pricing = e.pricing ? f.fromJS(e.pricing) : new f(), this.subject = e.subject, this.sender = e.sender ? h.fromJS(e.sender) : new h(), this.recipient = e.recipient ? h.fromJS(e.recipient) : new h(), this.dates = e.dates ? u.fromJS(e.dates) : new u(), this.company = e.company ? l.fromJS(e.company) : new l(), this.address = e.address ? m.fromJS(e.address) : new m();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new v();
    return i.init(e), i;
  }
  toJSON(e) {
    if (e = typeof e == "object" ? e : {}, Array.isArray(this.summarizedProducts)) {
      e.summarizedProducts = [];
      for (let i of this.summarizedProducts)
        e.summarizedProducts.push(i.toJSON());
    }
    if (e.reference = this.reference ? this.reference.toJSON() : void 0, Array.isArray(this.products)) {
      e.products = [];
      for (let i of this.products)
        e.products.push(i.toJSON());
    }
    return e.pricing = this.pricing ? this.pricing.toJSON() : void 0, e.subject = this.subject, e.sender = this.sender ? this.sender.toJSON() : void 0, e.recipient = this.recipient ? this.recipient.toJSON() : void 0, e.dates = this.dates ? this.dates.toJSON() : void 0, e.company = this.company ? this.company.toJSON() : void 0, e.address = this.address ? this.address.toJSON() : void 0, e;
  }
}
class D {
  constructor(e) {
    t(this, "params");
    t(this, "settings");
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
    let i = new D();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
var z = /* @__PURE__ */ ((n) => (n.Validation_failed = "Validation failed", n))(z || {}), G = /* @__PURE__ */ ((n) => (n.Internal_Server_Error = "Internal Server Error", n))(G || {});
class H extends Error {
  constructor(i, o, s, r, c) {
    super();
    t(this, "message");
    t(this, "status");
    t(this, "response");
    t(this, "headers");
    t(this, "result");
    t(this, "isApiException", !0);
    this.message = i, this.status = o, this.response = s, this.headers = r, this.result = c;
  }
  static isApiException(i) {
    return i.isApiException === !0;
  }
}
function S(n, e, i, o, s) {
  throw s ?? new H(n, e, i, o, null);
}
export {
  m as Address,
  H as ApiException,
  q as Client,
  l as Company,
  y as ContractParameters,
  P as ContractRouteParams,
  C as ContractType,
  u as Dates,
  p as FileSettings,
  h as Identity,
  O as InternalError,
  G as InternalErrorMessage,
  v as InvoiceParameters,
  j as InvoiceReferences,
  D as InvoiceRouteParams,
  x as InvoiceType,
  V as Language,
  w as Product,
  g as ProductPricing,
  b as References,
  I as ReturnFileType,
  f as TotalPricing,
  E as VAT,
  J as ValidateErrorJSON,
  z as ValidateErrorJSONMessage
};
