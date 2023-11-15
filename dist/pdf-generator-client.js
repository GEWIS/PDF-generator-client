class z {
  constructor(e, i) {
    this.jsonParseReviver = void 0, this.http = i || window, this.baseUrl = e ?? "/pdf";
  }
  /**
   * @return Created
   */
  generateContract(e, i) {
    let n = this.baseUrl + "/contract/{type}";
    if (e == null)
      throw new Error("The parameter 'type' must be defined.");
    n = n.replace("{type}", encodeURIComponent("" + e)), n = n.replace(/[?&]$/, "");
    let s = {
      body: JSON.stringify(i),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(n, s).then((o) => this.processGenerateContract(o));
  }
  processGenerateContract(e) {
    const i = e.status;
    let n = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((t, s) => n[s] = t), i === 201) {
      const t = e.headers ? e.headers.get("content-disposition") : void 0;
      let s = t ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(t) : void 0, o = s && s.length > 1 ? s[3] || s[2] : void 0;
      return o ? o = decodeURIComponent(o) : (s = t ? /filename="?([^"]*?)"?(;|$)/g.exec(t) : void 0, o = s && s.length > 1 ? s[1] : void 0), e.blob().then((O) => ({ fileName: o, data: O, status: i, headers: n }));
    } else {
      if (i === 422)
        return e.text().then((t) => {
          let s = null, o = t === "" ? null : JSON.parse(t, this.jsonParseReviver);
          return s = y.fromJS(o), S("Validation Failed", i, t, n, s);
        });
      if (i === 500)
        return e.text().then((t) => {
          let s = null, o = t === "" ? null : JSON.parse(t, this.jsonParseReviver);
          return s = J.fromJS(o), S("Internal Server Error", i, t, n, s);
        });
      if (i !== 200 && i !== 204)
        return e.text().then((t) => S("An unexpected server error occurred.", i, t, n));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Created
   */
  generateInvoice(e, i) {
    let n = this.baseUrl + "/invoice/{type}";
    if (e == null)
      throw new Error("The parameter 'type' must be defined.");
    n = n.replace("{type}", encodeURIComponent("" + e)), n = n.replace(/[?&]$/, "");
    let s = {
      body: JSON.stringify(i),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(n, s).then((o) => this.processGenerateInvoice(o));
  }
  processGenerateInvoice(e) {
    const i = e.status;
    let n = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((t, s) => n[s] = t), i === 201) {
      const t = e.headers ? e.headers.get("content-disposition") : void 0;
      let s = t ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(t) : void 0, o = s && s.length > 1 ? s[3] || s[2] : void 0;
      return o ? o = decodeURIComponent(o) : (s = t ? /filename="?([^"]*?)"?(;|$)/g.exec(t) : void 0, o = s && s.length > 1 ? s[1] : void 0), e.blob().then((O) => ({ fileName: o, data: O, status: i, headers: n }));
    } else {
      if (i === 422)
        return e.text().then((t) => {
          let s = null, o = t === "" ? null : JSON.parse(t, this.jsonParseReviver);
          return s = y.fromJS(o), S("Validation Failed", i, t, n, s);
        });
      if (i === 500)
        return e.text().then((t) => {
          let s = null, o = t === "" ? null : JSON.parse(t, this.jsonParseReviver);
          return s = J.fromJS(o), S("Internal Server Error", i, t, n, s);
        });
      if (i !== 200 && i !== 204)
        return e.text().then((t) => S("An unexpected server error occurred.", i, t, n));
    }
    return Promise.resolve(null);
  }
}
class y {
  constructor(e) {
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
    let i = new y();
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
class J {
  constructor(e) {
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.message = e.message);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new J();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.message = this.message, e;
  }
}
var D = /* @__PURE__ */ ((r) => (r.Contract = "contract", r.Quote = "quote", r))(D || {});
class c {
  constructor(e) {
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
var A = /* @__PURE__ */ ((r) => (r.ZERO = "ZERO", r.LOW = "LOW", r.HIGH = "HIGH", r))(A || {});
class p {
  constructor(e) {
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.basePrice = e.basePrice, this.discount = e.discount, this.vatAmount = e.vatAmount, this.vatCategory = e.vatCategory, this.quantity = e.quantity);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new p();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.basePrice = this.basePrice, e.discount = this.discount, e.vatAmount = this.vatAmount, e.vatCategory = this.vatCategory, e.quantity = this.quantity, e;
  }
}
class w {
  constructor(e) {
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.pricing = new p());
  }
  init(e) {
    e && (this.name = e.name, this.details = e.details, this.summary = e.summary, this.specification = e.specification, this.pricing = e.pricing ? p.fromJS(e.pricing) : new p());
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
class h {
  constructor(e) {
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.exclVat = e.exclVat, this.lowVat = e.lowVat, this.highVat = e.highVat, this.inclVat = e.inclVat);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new h();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.exclVat = this.exclVat, e.lowVat = this.lowVat, e.highVat = this.highVat, e.inclVat = this.inclVat, e;
  }
}
class f {
  constructor(e) {
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.date = e.date ? new Date(e.date.toString()) : void 0, this.dueDate = e.dueDate ? new Date(e.dueDate.toString()) : void 0, this.dueDays = e.dueDays, this.startDate = e.startDate ? new Date(e.startDate.toString()) : void 0, this.endDate = e.endDate ? new Date(e.endDate.toString()) : void 0);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new f();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.date = this.date ? this.date.toISOString() : void 0, e.dueDate = this.dueDate ? this.dueDate.toISOString() : void 0, e.dueDays = this.dueDays, e.startDate = this.startDate ? this.startDate.toISOString() : void 0, e.endDate = this.endDate ? this.endDate.toISOString() : void 0, e;
  }
}
class u {
  constructor(e) {
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.name = e.name, this.id = e.id);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new u();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.id = this.id, e;
  }
}
class l {
  constructor(e) {
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.street = e.street, this.postalCode = e.postalCode, this.city = e.city, this.country = e.country);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new l();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.street = this.street, e.postalCode = this.postalCode, e.city = this.city, e.country = this.country, e;
  }
}
class N {
  constructor(e) {
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.ourReference = e.ourReference, this.yourReference = e.yourReference);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new N();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.ourReference = this.ourReference, e.yourReference = this.yourReference, e;
  }
}
class v {
  constructor(e) {
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.sender = new c(), this.recipient = new c(), this.dates = new f(), this.company = new u(), this.address = new l(), this.products = [], this.pricing = new h(), this.firstSignee = new c(), this.secondSignee = new c());
  }
  init(e) {
    if (e) {
      if (this.subject = e.subject, this.sender = e.sender ? c.fromJS(e.sender) : new c(), this.recipient = e.recipient ? c.fromJS(e.recipient) : new c(), this.dates = e.dates ? f.fromJS(e.dates) : new f(), this.company = e.company ? u.fromJS(e.company) : new u(), this.address = e.address ? l.fromJS(e.address) : new l(), this.reference = e.reference ? N.fromJS(e.reference) : void 0, Array.isArray(e.products)) {
        this.products = [];
        for (let i of e.products)
          this.products.push(w.fromJS(i));
      }
      this.pricing = e.pricing ? h.fromJS(e.pricing) : new h(), this.firstSignee = e.firstSignee ? c.fromJS(e.firstSignee) : new c(), this.secondSignee = e.secondSignee ? c.fromJS(e.secondSignee) : new c();
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
var R = /* @__PURE__ */ ((r) => (r.DUTCH = "DUTCH", r.ENGLISH = "ENGLISH", r))(R || {}), C = /* @__PURE__ */ ((r) => (r.PDF = "PDF", r.TEX = "TEX", r))(C || {});
class m {
  constructor(e) {
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.name = e.name, this.language = e.language, this.fileType = e.fileType, this.stationery = e.stationery, this.createdAt = e.createdAt ? new Date(e.createdAt.toString()) : void 0);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new m();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.language = this.language, e.fileType = this.fileType, e.stationery = this.stationery, e.createdAt = this.createdAt ? this.createdAt.toISOString() : void 0, e;
  }
}
class j {
  constructor(e) {
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.params = new v(), this.settings = new m());
  }
  init(e) {
    e && (this.params = e.params ? v.fromJS(e.params) : new v(), this.settings = e.settings ? m.fromJS(e.settings) : new m());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new j();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
var E = /* @__PURE__ */ ((r) => (r.Invoice = "invoice", r.Weeklysales = "weeklysales", r.Creditnota = "creditnota", r))(E || {});
class b {
  constructor(e) {
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.ourReference = e.ourReference, this.yourReference = e.yourReference, this.costCenter = e.costCenter);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new b();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.ourReference = this.ourReference, e.yourReference = this.yourReference, e.costCenter = this.costCenter, e;
  }
}
class g {
  constructor(e) {
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.products = [], this.pricing = new h(), this.sender = new c(), this.recipient = new c(), this.dates = new f(), this.company = new u(), this.address = new l());
  }
  init(e) {
    if (e) {
      if (Array.isArray(e.summarizedProducts)) {
        this.summarizedProducts = [];
        for (let i of e.summarizedProducts)
          this.summarizedProducts.push(w.fromJS(i));
      }
      if (this.reference = e.reference ? b.fromJS(e.reference) : void 0, Array.isArray(e.products)) {
        this.products = [];
        for (let i of e.products)
          this.products.push(w.fromJS(i));
      }
      this.pricing = e.pricing ? h.fromJS(e.pricing) : new h(), this.subject = e.subject, this.sender = e.sender ? c.fromJS(e.sender) : new c(), this.recipient = e.recipient ? c.fromJS(e.recipient) : new c(), this.dates = e.dates ? f.fromJS(e.dates) : new f(), this.company = e.company ? u.fromJS(e.company) : new u(), this.address = e.address ? l.fromJS(e.address) : new l();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new g();
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
class P {
  constructor(e) {
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.params = new g(), this.settings = new m());
  }
  init(e) {
    e && (this.params = e.params ? g.fromJS(e.params) : new g(), this.settings = e.settings ? m.fromJS(e.settings) : new m());
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
var I = /* @__PURE__ */ ((r) => (r.Validation_failed = "Validation failed", r))(I || {}), V = /* @__PURE__ */ ((r) => (r.Internal_Server_Error = "Internal Server Error", r))(V || {});
class x extends Error {
  constructor(e, i, n, t, s) {
    super(), this.isApiException = !0, this.message = e, this.status = i, this.response = n, this.headers = t, this.result = s;
  }
  static isApiException(e) {
    return e.isApiException === !0;
  }
}
function S(r, e, i, n, t) {
  throw t ?? new x(r, e, i, n, null);
}
export {
  l as Address,
  x as ApiException,
  z as Client,
  u as Company,
  v as ContractParameters,
  j as ContractRouteParams,
  D as ContractType,
  f as Dates,
  m as FileSettings,
  c as Identity,
  J as InternalError,
  V as InternalErrorMessage,
  g as InvoiceParameters,
  b as InvoiceReferences,
  P as InvoiceRouteParams,
  E as InvoiceType,
  R as Language,
  w as Product,
  p as ProductPricing,
  N as References,
  C as ReturnFileType,
  h as TotalPricing,
  A as VAT,
  y as ValidateErrorJSON,
  I as ValidateErrorJSONMessage
};
