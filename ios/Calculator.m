#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Calculator, NSObject)

RCT_EXTERN_METHOD(add:(double)a
                  b:(double)b
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end