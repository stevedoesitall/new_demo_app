/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>
#import <React/RCTRootView.h>
#if RCT_DEV
  #import <React/RCTDevLoadingView.h>
#endif
#import <Carnival/Carnival.h>
#import "RNCarnivalBridge.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions

{
  
  NSURL *jsCodeLocation;

#ifdef DEBUG
  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios&dev=true"];
#else
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif

  id<RCTBridgeDelegate> moduleInitialiser = [[RNCarnivalBridge alloc] initWithJSCodeLocation:jsCodeLocation appKey:@"1f5158db6a184378c5a09630a3404a0c1740f73e"]; 

  RCTBridge * bridge = [[RCTBridge alloc] initWithDelegate:moduleInitialiser launchOptions:launchOptions];
                                          
#if RCT_DEV
  [bridge moduleForClass:[RCTDevLoadingView class]];
#endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                               moduleName:@"my_app"
                                               initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  NSURL *url = [NSURL URLWithString:@"myapp://test"];
  [[UIApplication sharedApplication] openURL:url];
  
  
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  
  //NSLog([url absoluteString]);
  
//  UIAlertView *av = [[UIAlertView alloc] initWithTitle:@"You clicked on a link" message:[url absoluteString] delegate:nil cancelButtonTitle:@"Cancel" otherButtonTitles:nil];
//  [av show];

  return [RCTLinkingManager application:application openURL:url options:options];
}


//- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
// restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
//{
//  if ([userActivity webpageURL] != nil) {
//    NSURL *routingURL = nil;
//    NSURL *incomingURL = [userActivity webpageURL];
//    if ([[incomingURL host] isEqualToString:@"link.stevedoesitall.com"]) {
//      routingURL = [Carnival handleSailthruLink:incomingURL];
//    } else {
//      routingURL = incomingURL;
//    }
//
//    // set decoded link here to provide to React Native
//    userActivity.webpageURL = routingURL;
//  }
//  // pass to React Native Linking Manager
//  return [RCTLinkingManager application:application
//          continueUserActivity:userActivity
//          restorationHandler:restorationHandler];
//}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
