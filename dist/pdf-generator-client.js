var V = Object.defineProperty;
var I = (o, e, i) => e in o ? V(o, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : o[e] = i;
var t = (o, e, i) => (I(o, typeof e != "symbol" ? e + "" : e, i), i);
class L {
  constructor(e, i) {
    t(this, "http");
    t(this, "baseUrl");
    t(this, "jsonParseReviver");
    this.http = i || window, this.baseUrl = e ?? "/pdf";
  }
  /**
   * @return Ok
   */
  generatePayout(e) {
    let i = this.baseUrl + "/payout";
    i = i.replace(/[?&]$/, "");
    let s = {
      body: JSON.stringify(e),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(i, s).then((r) => this.processGeneratePayout(r));
  }
  processGeneratePayout(e) {
    const i = e.status;
    let n = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => n[r] = s), i === 200 || i === 206) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, c = r && r.length > 1 ? r[3] || r[2] : void 0;
      return c ? c = decodeURIComponent(c) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, c = r && r.length > 1 ? r[1] : void 0), e.blob().then((y) => ({ fileName: c, data: y, status: i, headers: n }));
    } else {
      if (i === 422)
        return e.text().then((s) => {
          let r = null, c = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = v.fromJS(c), S("Validation Failed", i, s, n, r);
        });
      if (i === 500)
        return e.text().then((s) => {
          let r = null, c = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(c), S("Internal Server Error", i, s, n, r);
        });
      if (i !== 200 && i !== 204)
        return e.text().then((s) => S("An unexpected server error occurred.", i, s, n));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generateContract(e, i) {
    let n = this.baseUrl + "/contract/{type}";
    if (e == null)
      throw new Error("The parameter 'type' must be defined.");
    n = n.replace("{type}", encodeURIComponent("" + e)), n = n.replace(/[?&]$/, "");
    let r = {
      body: JSON.stringify(i),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(n, r).then((c) => this.processGenerateContract(c));
  }
  processGenerateContract(e) {
    const i = e.status;
    let n = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => n[r] = s), i === 200 || i === 206) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, c = r && r.length > 1 ? r[3] || r[2] : void 0;
      return c ? c = decodeURIComponent(c) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, c = r && r.length > 1 ? r[1] : void 0), e.blob().then((y) => ({ fileName: c, data: y, status: i, headers: n }));
    } else {
      if (i === 422)
        return e.text().then((s) => {
          let r = null, c = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = v.fromJS(c), S("Validation Failed", i, s, n, r);
        });
      if (i === 500)
        return e.text().then((s) => {
          let r = null, c = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(c), S("Internal Server Error", i, s, n, r);
        });
      if (i !== 200 && i !== 204)
        return e.text().then((s) => S("An unexpected server error occurred.", i, s, n));
    }
    return Promise.resolve(null);
  }
  /**
   * @return Ok
   */
  generateInvoice(e, i) {
    let n = this.baseUrl + "/invoice/{type}";
    if (e == null)
      throw new Error("The parameter 'type' must be defined.");
    n = n.replace("{type}", encodeURIComponent("" + e)), n = n.replace(/[?&]$/, "");
    let r = {
      body: JSON.stringify(i),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf+tex"
      }
    };
    return this.http.fetch(n, r).then((c) => this.processGenerateInvoice(c));
  }
  processGenerateInvoice(e) {
    const i = e.status;
    let n = {};
    if (e.headers && e.headers.forEach && e.headers.forEach((s, r) => n[r] = s), i === 200 || i === 206) {
      const s = e.headers ? e.headers.get("content-disposition") : void 0;
      let r = s ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(s) : void 0, c = r && r.length > 1 ? r[3] || r[2] : void 0;
      return c ? c = decodeURIComponent(c) : (r = s ? /filename="?([^"]*?)"?(;|$)/g.exec(s) : void 0, c = r && r.length > 1 ? r[1] : void 0), e.blob().then((y) => ({ fileName: c, data: y, status: i, headers: n }));
    } else {
      if (i === 422)
        return e.text().then((s) => {
          let r = null, c = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = v.fromJS(c), S("Validation Failed", i, s, n, r);
        });
      if (i === 500)
        return e.text().then((s) => {
          let r = null, c = s === "" ? null : JSON.parse(s, this.jsonParseReviver);
          return r = J.fromJS(c), S("Internal Server Error", i, s, n, r);
        });
      if (i !== 200 && i !== 204)
        return e.text().then((s) => S("An unexpected server error occurred.", i, s, n));
    }
    return Promise.resolve(null);
  }
}
class v {
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
    let i = new v();
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
    let i = new J();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.message = this.message, e;
  }
}
class w {
  constructor(e) {
    t(this, "bankAccountName");
    t(this, "bankAccountNumber");
    t(this, "amount");
    t(this, "reference");
    t(this, "date");
    t(this, "debtorNumber");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
  }
  init(e) {
    e && (this.bankAccountName = e.bankAccountName, this.bankAccountNumber = e.bankAccountNumber, this.amount = e.amount, this.reference = e.reference, this.date = e.date ? new Date(e.date.toString()) : void 0, this.debtorNumber = e.debtorNumber);
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new w();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.bankAccountName = this.bankAccountName, e.bankAccountNumber = this.bankAccountNumber, e.amount = this.amount, e.reference = this.reference, e.date = this.date ? this.date.toISOString() : void 0, e.debtorNumber = this.debtorNumber, e;
  }
}
class N {
  constructor(e) {
    t(this, "payout");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.payout = new w());
  }
  init(e) {
    e && (this.payout = e.payout ? w.fromJS(e.payout) : new w());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new N();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.payout = this.payout ? this.payout.toJSON() : void 0, e;
  }
}
var x = /* @__PURE__ */ ((o) => (o.DUTCH = "DUTCH", o.ENGLISH = "ENGLISH", o))(x || {}), k = /* @__PURE__ */ ((o) => (o.PDF = "PDF", o.TEX = "TEX", o))(k || {});
class u {
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
    let i = new u();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.language = this.language, e.fileType = this.fileType, e.stationery = this.stationery, e.createdAt = this.createdAt ? this.createdAt.toISOString() : void 0, e;
  }
}
class D {
  constructor(e) {
    t(this, "params");
    t(this, "settings");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.params = new N(), this.settings = new u());
  }
  init(e) {
    e && (this.params = e.params ? N.fromJS(e.params) : new N(), this.settings = e.settings ? u.fromJS(e.settings) : new u());
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
var U = /* @__PURE__ */ ((o) => (o.Contract = "contract", o.Quote = "quote", o))(U || {});
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
var G = /* @__PURE__ */ ((o) => (o.ZERO = "ZERO", o.LOW = "LOW", o.HIGH = "HIGH", o))(G || {});
class b {
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
    let i = new b();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.basePrice = this.basePrice, e.discount = this.discount, e.vatAmount = this.vatAmount, e.vatCategory = this.vatCategory, e.quantity = this.quantity, e;
  }
}
class g {
  constructor(e) {
    t(this, "name");
    t(this, "details");
    t(this, "summary");
    t(this, "specification");
    t(this, "pricing");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.pricing = new b());
  }
  init(e) {
    e && (this.name = e.name, this.details = e.details, this.summary = e.summary, this.specification = e.specification, this.pricing = e.pricing ? b.fromJS(e.pricing) : new b());
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
class l {
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
    let i = new l();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.date = this.date ? this.date.toISOString() : void 0, e.dueDate = this.dueDate ? this.dueDate.toISOString() : void 0, e.dueDays = this.dueDays, e.startDate = this.startDate ? this.startDate.toISOString() : void 0, e.endDate = this.endDate ? this.endDate.toISOString() : void 0, e;
  }
}
class m {
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
    let i = new m();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.name = this.name, e.id = this.id, e;
  }
}
class p {
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
    let i = new p();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.street = this.street, e.postalCode = this.postalCode, e.city = this.city, e.country = this.country, e;
  }
}
class P {
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
    let i = new P();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.ourReference = this.ourReference, e.yourReference = this.yourReference, e;
  }
}
class O {
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
    e || (this.sender = new h(), this.recipient = new h(), this.dates = new l(), this.company = new m(), this.address = new p(), this.products = [], this.pricing = new f(), this.firstSignee = new h(), this.secondSignee = new h());
  }
  init(e) {
    if (e) {
      if (this.subject = e.subject, this.sender = e.sender ? h.fromJS(e.sender) : new h(), this.recipient = e.recipient ? h.fromJS(e.recipient) : new h(), this.dates = e.dates ? l.fromJS(e.dates) : new l(), this.company = e.company ? m.fromJS(e.company) : new m(), this.address = e.address ? p.fromJS(e.address) : new p(), this.reference = e.reference ? P.fromJS(e.reference) : void 0, Array.isArray(e.products)) {
        this.products = [];
        for (let i of e.products)
          this.products.push(g.fromJS(i));
      }
      this.pricing = e.pricing ? f.fromJS(e.pricing) : new f(), this.firstSignee = e.firstSignee ? h.fromJS(e.firstSignee) : new h(), this.secondSignee = e.secondSignee ? h.fromJS(e.secondSignee) : new h();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new O();
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
class R {
  constructor(e) {
    t(this, "params");
    t(this, "settings");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.params = new O(), this.settings = new u());
  }
  init(e) {
    e && (this.params = e.params ? O.fromJS(e.params) : new O(), this.settings = e.settings ? u.fromJS(e.settings) : new u());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new R();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
var z = /* @__PURE__ */ ((o) => (o.Invoice = "invoice", o.Weeklysales = "weeklysales", o.Creditnota = "creditnota", o))(z || {});
class A {
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
    let i = new A();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.ourReference = this.ourReference, e.yourReference = this.yourReference, e.costCenter = this.costCenter, e;
  }
}
class C {
  constructor(e) {
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
    e || (this.products = [], this.pricing = new f(), this.sender = new h(), this.recipient = new h(), this.dates = new l(), this.company = new m(), this.address = new p());
  }
  init(e) {
    if (e) {
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
      if (Array.isArray(e.products)) {
        this.products = [];
        for (let n of e.products)
          this.products.push(g.fromJS(n));
      }
      this.pricing = e.pricing ? f.fromJS(e.pricing) : new f(), this.subject = e.subject, this.sender = e.sender ? h.fromJS(e.sender) : new h(), this.recipient = e.recipient ? h.fromJS(e.recipient) : new h(), this.dates = e.dates ? l.fromJS(e.dates) : new l(), this.company = e.company ? m.fromJS(e.company) : new m(), this.address = e.address ? p.fromJS(e.address) : new p();
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new C();
    return i.init(e), i;
  }
  toJSON(e) {
    e = typeof e == "object" ? e : {};
    for (var i in this)
      this.hasOwnProperty(i) && (e[i] = this[i]);
    if (Array.isArray(this.products)) {
      e.products = [];
      for (let n of this.products)
        e.products.push(n.toJSON());
    }
    return e.pricing = this.pricing ? this.pricing.toJSON() : void 0, e.subject = this.subject, e.sender = this.sender ? this.sender.toJSON() : void 0, e.recipient = this.recipient ? this.recipient.toJSON() : void 0, e.dates = this.dates ? this.dates.toJSON() : void 0, e.company = this.company ? this.company.toJSON() : void 0, e.address = this.address ? this.address.toJSON() : void 0, e;
  }
}
class j {
  constructor(e) {
    t(this, "products");
    t(this, "pricing");
    t(this, "subject");
    t(this, "sender");
    t(this, "recipient");
    t(this, "dates");
    t(this, "company");
    t(this, "address");
    t(this, "summarizedProducts");
    t(this, "reference");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.products = [], this.pricing = new f(), this.sender = new h(), this.recipient = new h(), this.dates = new l(), this.company = new m(), this.address = new p());
  }
  init(e) {
    if (e) {
      if (Array.isArray(e.products)) {
        this.products = [];
        for (let i of e.products)
          this.products.push(g.fromJS(i));
      }
      if (this.pricing = e.pricing ? f.fromJS(e.pricing) : new f(), this.subject = e.subject, this.sender = e.sender ? h.fromJS(e.sender) : new h(), this.recipient = e.recipient ? h.fromJS(e.recipient) : new h(), this.dates = e.dates ? l.fromJS(e.dates) : new l(), this.company = e.company ? m.fromJS(e.company) : new m(), this.address = e.address ? p.fromJS(e.address) : new p(), Array.isArray(e.summarizedProducts)) {
        this.summarizedProducts = [];
        for (let i of e.summarizedProducts)
          this.summarizedProducts.push(g.fromJS(i));
      }
      this.reference = e.reference ? A.fromJS(e.reference) : void 0;
    }
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new j();
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
class E {
  constructor(e) {
    t(this, "params");
    t(this, "settings");
    if (e)
      for (var i in e)
        e.hasOwnProperty(i) && (this[i] = e[i]);
    e || (this.params = new j(), this.settings = new u());
  }
  init(e) {
    e && (this.params = e.params ? j.fromJS(e.params) : new j(), this.settings = e.settings ? u.fromJS(e.settings) : new u());
  }
  static fromJS(e) {
    e = typeof e == "object" ? e : {};
    let i = new E();
    return i.init(e), i;
  }
  toJSON(e) {
    return e = typeof e == "object" ? e : {}, e.params = this.params ? this.params.toJSON() : void 0, e.settings = this.settings ? this.settings.toJSON() : void 0, e;
  }
}
var H = /* @__PURE__ */ ((o) => (o.Validation_failed = "Validation failed", o))(H || {}), q = /* @__PURE__ */ ((o) => (o.Internal_Server_Error = "Internal Server Error", o))(q || {});
class $ extends Error {
  constructor(i, n, s, r, c) {
    super();
    t(this, "message");
    t(this, "status");
    t(this, "response");
    t(this, "headers");
    t(this, "result");
    t(this, "isApiException", !0);
    this.message = i, this.status = n, this.response = s, this.headers = r, this.result = c;
  }
  static isApiException(i) {
    return i.isApiException === !0;
  }
}
function S(o, e, i, n, s) {
  throw s ?? new $(o, e, i, n, null);
}
export {
  p as Address,
  $ as ApiException,
  L as Client,
  m as Company,
  O as ContractParameters,
  R as ContractRouteParams,
  U as ContractType,
  l as Dates,
  u as FileSettings,
  h as Identity,
  J as InternalError,
  q as InternalErrorMessage,
  j as InvoiceParameters,
  A as InvoiceReferences,
  E as InvoiceRouteParams,
  z as InvoiceType,
  x as Language,
  w as Payout,
  N as PayoutParameters,
  D as PayoutRouteParams,
  g as Product,
  b as ProductPricing,
  C as Reference__,
  P as References,
  k as ReturnFileType,
  f as TotalPricing,
  G as VAT,
  v as ValidateErrorJSON,
  H as ValidateErrorJSONMessage
};
