import Foundation
import React

@objc(Calculator)
class Calculator: NSObject {

  @objc
  func add(_ a: Double,
           b: Double,
           resolve: RCTPromiseResolveBlock,
           reject: RCTPromiseRejectBlock) {
    let result = a + b
    resolve(result)
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}